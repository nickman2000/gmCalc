import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Add this import
import { CommonModule } from '@angular/common'; // Usually needed for *ngIf, *ngFor

interface RoofInput {
  id: number;
  length: number;
  width: number;
}

@Component({
  selector: 'app-home',
  standalone: true, // Make it standalone
  imports: [CommonModule, FormsModule], // Add FormsModule here
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // Primary number as specified
  primaryNumb: number = 0.0075;
  
  // Active section tracking
  activeSection: string = '';
  
  // Floor section variables
  floorLength: number = 0;
  floorResult: number = 0;
  showFloorResult: boolean = false;
  
  // Wall section variables
  wallHeight: number = 0;
  wallPerimeter: number = 0;
  wallResult: number = 0;
  showWallResult: boolean = false;
  
  // Roof section variables
  roofInputs: RoofInput[] = [];
  roofInputCounter: number = 0;
  roofResult: number = 0;
  showRoofResult: boolean = false;
  
  // Heating section variables
  floorLenght: number = 0;  // Note: keeping the typo as per your specification
  floorWidth: number = 0;
  wallLength: number = 0;
  wallWidth: number = 0;
  roofLength: number = 0;
  roofWidth: number = 0;
  hotCount: number = 0;
  heatingResult1: number = 0;
  heatingResult2: number = 0;
  showHeatingResult: boolean = false;

  constructor() {
    // Initialize with one roof input pair
    this.addRoofInput();
  }

  // Custom rounding function (round up to 1 decimal place)
  private customRound(number: number): number {
    return Math.ceil(number * 10) / 10;
  }

  // Show selected section
  showSection(sectionName: string): void {
    if(sectionName === this.activeSection) {
      this.activeSection = '';
      return;
    }
    this.activeSection = sectionName;
    // Hide all results when switching sections
    this.showFloorResult = false;
    this.showWallResult = false;
    this.showRoofResult = false;
    this.showHeatingResult = false;
  }

  // Floor calculation
  calculateFloor(): void {
    if (!this.floorLength || this.floorLength <= 0) {
      alert('Please enter a valid length');
      return;
    }
    
    const result = (this.floorLength / 0.6) * this.primaryNumb * 6;
    this.floorResult = this.customRound(result);
    this.showFloorResult = true;
  }

  // Wall calculation
  calculateWall(): void {
    if (!this.wallHeight || !this.wallPerimeter || this.wallHeight <= 0 || this.wallPerimeter <= 0) {
      alert('Please enter valid height and perimeter values');
      return;
    }
    
    const result = (this.wallPerimeter / 0.5) * this.primaryNumb * this.wallHeight;
    this.wallResult = this.customRound(result);
    this.showWallResult = true;
  }

  // Add roof input pair
  addRoofInput(): void {
    this.roofInputCounter++;
    this.roofInputs.push({
      id: this.roofInputCounter,
      length: 0,
      width: 0
    });
  }

  // Remove roof input pair
  removeRoofInput(id: number): void {
    this.roofInputs = this.roofInputs.filter(input => input.id !== id);
  }

  // Roof calculation
  calculateRoof(): void {
    if (this.roofInputs.length === 0) {
      alert('Please add at least one input pair');
      return;
    }
    
    let totalSum = 0;
    let hasValidInput = false;
    
    for (const input of this.roofInputs) {
      if (input.length > 0 && input.width > 0) {
        const result = (input.width / 0.6) * this.primaryNumb * input.length;
        totalSum += result;
        hasValidInput = true;
      }
    }
    
    if (!hasValidInput) {
      alert('Please enter valid values in at least one input pair');
      return;
    }
    
    this.roofResult = this.customRound(totalSum);
    this.showRoofResult = true;
  }

  // Heating calculation
  calculateHeating(): void {
    const inputs = [
      this.floorLenght, this.floorWidth, this.wallLength, 
      this.wallWidth, this.roofLength, this.roofWidth, this.hotCount
    ];
    
    if (inputs.some(input => !input || input <= 0)) {
      alert('Please enter valid values for all fields');
      return;
    }
    
    // First formula: floorLength * floorWidth + wallLength * wallWidth + roofLength * roofWidth * hotCount
    const result1 = (this.floorLenght * this.floorWidth + this.wallLength * this.wallWidth + this.roofLength * this.roofWidth) * this.hotCount;
    this.heatingResult1 = this.customRound(result1);
    
    // Second formula: wallLength * wallWidth * 2 + roofWidth * roofLength
    const result2 = this.wallLength * this.wallWidth * 2 + this.roofWidth * this.roofLength;
    this.heatingResult2 = this.customRound(result2);
    
    this.showHeatingResult = true;
  }

  // Helper method to check if section is active
  isSectionActive(sectionName: string): boolean {
    return this.activeSection === sectionName;
  }
}