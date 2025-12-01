import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-binding',
  imports: [],
  templateUrl: './data-binding.html',
  styleUrl: './data-binding.css',
})
export class DataBinding {
  message = 'Data Binding Demonstration';
  imageURL = 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=400';
  textColor = 'color: blue';
  isHighlighted = true;
  yourName = 'Ryna Mae F. David';
  count = 0;
  
  increment() {
    this.count++;
  }
  
  decrement() {
    this.count--;
  }

  resetCount() {
    this.count = 0;
  }

  //Interpolation
  studentName = "Ryna Mae F. David"
  score = 95;

  //Property binding
  imageUrl = 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400';
  isDisabled = true

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }

  //Attribute Binding
  colSpanValue = 3

  //Class Binding
  isPassing = true

  togglePassing() {
    this.isPassing = !this.isPassing;
  }

  // Style binding
  boxColor = "purple";
  boxSize = "150px"

  colors = ['purple', '#FF6D0C', '#134A2B', '#E883B9', '#FF9E36'];
  currentColorIndex = 0;

  changeColor() {
    this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
    this.boxColor = this.colors[this.currentColorIndex];
  }
}