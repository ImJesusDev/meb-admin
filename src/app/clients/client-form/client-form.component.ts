import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/* Models */
import { Client, User } from '../../models';
@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent implements OnInit {
  /* New Client Object */
  client: Client;
  /* List of users (admins) */
  @Input() users: User[] | null = [];
  @Input() loader: boolean | null = false;
  /* Form Group */
  clientForm: FormGroup;
  /* base64 logo */
  base64Logo = '';
  /* Show MEB admin modal */
  showMebAdminModal = false;
  /* Show Back Drop */
  showBackDrop = false;
  /* Store selected meb admin */
  mebAdmin: User = {} as User;
  @Output() createClient: EventEmitter<Client> = new EventEmitter();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter();
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
      mebAdmin: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  cancelCreate(): void {
    this.cancel.emit(true);
  }

  openModal(): void {
    this.showBackDrop = true;
    setTimeout(() => {
      this.showMebAdminModal = true;
    }, 100);
  }
  closeModal(): void {
    if (this.mebAdmin.id) {
      this.clientForm.patchValue({
        mebAdmin: `${this.mebAdmin.firstName} ${this.mebAdmin.lastName}`,
      });
    }
    this.showMebAdminModal = false;
    setTimeout(() => {
      this.showBackDrop = false;
    }, 100);
  }

  submitForm(): void {
    this.createClient.emit({
      logo: this.base64Logo,
      name: this.clientForm.controls['name'].value,
      nit: this.clientForm.controls['nit'].value,
      slug: '',
      id: '',
    });
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
