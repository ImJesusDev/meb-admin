import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/* Models */
import { Client } from '../../models/client';
@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent implements OnInit {
  /* New Client Object */
  client: Client;
  /* Form Group */
  clientForm: FormGroup;
  /* base64 logo */
  base64Logo = '';
  constructor(private _formBuilder: FormBuilder) {
    this.client = {
      id: '',
      name: '',
      nit: '',
      logo: '',
      slug: '',
    };
    this.clientForm = this._formBuilder.group({
      name: [this.client.name, [Validators.required]],
      nit: [this.client.nit, [Validators.required]],
      logo: [this.client.logo, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  submitForm(): void {
    console.log(this.clientForm.value);
  }
  /* Handle file change */
  fileChanged(event: any): void {
    // Instance of reader
    const reader = new FileReader();
    // Check if any file is selected
    if (event.target && event.target.files.length) {
      // Get file name
      const filename = event.target.files[0].name;
      // Initialize the base64 string with data type
      this.base64Logo = `data:${event.target.files[0].type};base64,`;
      // Bind function to execute on file load
      reader.onload = this._handleReaderLoaded.bind(this);
      // Read selected file
      reader.readAsBinaryString(event.target.files[0]);
      // Set as value of the form the name of the file
      this.clientForm.patchValue({
        logo: filename,
      });
    }
  }

  /**
   * Function to convert image file to
   * base 64 string
   */
  _handleReaderLoaded(readerEvt: any) {
    // Get binary string from FileReader
    var binaryString = readerEvt.target.result;
    // Convert binary to base64
    const base64String = btoa(binaryString);
    // Set the final base64 string
    this.base64Logo = `${this.base64Logo}${base64String}`;
  }
}
