// template-demo.component.ts
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-template-demo',
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './template-demo.html',
  styleUrl: './template-demo.css',
})
export class TemplateDemoComponent {
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  username = ''; email = ''; password = '';
  role = ''; gender = ''; status = ''; comments = '';
  submitted = false;

  onSubmit(): void {
    const formValues = {
      Username: this.username, Email: this.email,
      Role: this.role, Gender: this.gender,
      Status: this.status, Comments: this.comments,
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Confirm Submission', message: 'Review your details before submitting.', formValues },
      panelClass: 'custom-dialog-panel',
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.submitted = true;
        this.snackBar.open('✔ Form submitted successfully!', 'Dismiss', {
          duration: 4000, horizontalPosition: 'center', verticalPosition: 'bottom',
          panelClass: ['snack-success'],
        });
      } else {
        this.snackBar.open('✖ Submission cancelled.', 'OK', {
          duration: 2500, horizontalPosition: 'center', verticalPosition: 'bottom',
          panelClass: ['snack-cancel'],
        });
      }
    });
  }
}
