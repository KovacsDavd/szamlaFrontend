import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    RouterModule
  ],
  templateUrl: './regist.component.html',
  styleUrl: './regist.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  roles: string[] = [];
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private roleService: RoleService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      role: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.roleService.getRoles().subscribe({
      next: (roles) => {
        console.log('Beérkező szerepkörök:', roles);
        this.roles = roles;
      },
      error: (err) => {
        this.errorMessage = 'Nem sikerült betölteni a szerepköröket.';
        console.error('Hiba:', err);
      }
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const { name, username, password, role } = this.registerForm.value;
    this.authService.register(name, username, password, role).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        if (err.error && err.error.message) {
          const errorMessage = err.error.message;

          if (errorMessage === 'Username already exists') {
            this.errorMessage = 'A felhasználónév már foglalt.';
            alert('A felhasználónév már létezik. Kérjük, válassz egy másikat!');
          } else {
            this.errorMessage = 'Sikertelen regisztráció! Próbáld újra később.';
            console.error('Hiba:', err);
          }
        } else {
          this.errorMessage = 'Sikertelen regisztráció! Kérlek próbáld újra.';
          console.error('Hiba:', err);
        }
      }
    });
  }
}
