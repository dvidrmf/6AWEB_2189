// reactive-demo.component.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-reactive-demo',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './reactive-demo.html',
  styleUrl: './reactive-demo.css',
})
export class ReactiveDemoComponent {
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  roles = ['Admin', 'User', 'Guest'];
  form: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]{4,12}$/)]],
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]],
    role:     ['Admin', Validators.required],
    gender:   ['', Validators.required],
    status:   ['', Validators.required],
    comments: [''],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snackBar.open('⚠ Please fix validation errors first.', 'OK', {
        duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom',
        panelClass: ['snack-error'],
      });
      return;
    }
    const { password, ...rest } = this.form.value;
    const formValues = { ...rest, Password: '••••••••' };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Confirm Submission', message: 'Review your details before submitting.', formValues },
      panelClass: 'custom-dialog-panel',
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log(this.form.value);
        this.snackBar.open('✔ Form submitted successfully!', 'Dismiss', {
          duration: 4000, horizontalPosition: 'center', verticalPosition: 'bottom',
          panelClass: ['snack-success'],
        });
        this.form.reset({ role: 'Admin' });
      } else {
        this.snackBar.open('✖ Submission cancelled.', 'OK', {
          duration: 2500, horizontalPosition: 'center', verticalPosition: 'bottom',
          panelClass: ['snack-cancel'],
        });
      }
    });
  }

  isInvalid(name: string): boolean {
    const c = this.form.get(name);
    return !!(c?.touched && c?.invalid);
  }
}
