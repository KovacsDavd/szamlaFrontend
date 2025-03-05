import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RoleDialogComponent } from '../role-dialog/role-dialog.component';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  standalone: true,
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['name', 'roles', 'actions'];
  dataSource = new MatTableDataSource<User>();

  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.dataSource.data = users;
      },
      error: () => {
        console.error('Nem sikerült betölteni a felhasználókat.');
      },
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter((user) => user.id !== id);
        this.dataSource.data = [...this.users];
      },
      error: () => {
        console.error('Nem sikerült törölni a felhasználót.');
      },
    });
  }

  openRoleDialog(user: User): void {
    const dialogRef = this.dialog.open(RoleDialogComponent, {
      width: '100rem',
      data: { roles: user.roles },
    });

    dialogRef.afterClosed().subscribe((result: string[] | undefined) => {
      if (result) {
        this.userService.updateUserRoles(user.id, result).subscribe({
          next: () => {
            this.loadUsers();
          },
          error: () => {
            console.error('Nem sikerült frissíteni a szerepköröket.');
          },
        });
      }
    });
  }

  formatRoles(roles: { name: string }[]): string {
    return roles.map((role) => role.name).join(', ');
  }
}