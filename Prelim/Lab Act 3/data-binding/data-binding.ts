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

  //Interpolation
  studentName = "Ryna Mae F. David"
  score = 95;

  //Property binding
  imageUrl = 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400';
  isDisabled = true

  //Attribute Binding
  colSpanValue = 3

  //Class Binding
  isPassing = true

  // Style binding
  boxColor = "purple";
  boxSize = "150px"
}
