import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.css'],
  imports: [CommonModule, MatListModule, FormsModule],
})
export class RoleDialogComponent implements OnInit {
  roles: string[] = [];
  selectedRoles: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<RoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { roles: string[] },
    private roleService: RoleService
  ) {
    this.selectedRoles = data.roles;
  }

  ngOnInit() {
    this.roleService.getAllRoles().subscribe({
      next: (roles) => {
        console.log('Beérkező szerepkörök:', roles);
        this.roles = roles;
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.selectedRoles);
  }
}