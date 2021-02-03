import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { NiveauService } from '../../services/niveau.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-niveau',
  templateUrl: './niveau.component.html',
  styleUrls: ['./niveau.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ backgroundColor: 'black', opacity: 0 }),
        animate(2000, style({ backgroundColor: 'white', opacity: 1 }))
      ])
    ])
  ]
})
export class NiveauComponent implements OnInit {
  niveaux: any[] = [];
  addForm: FormGroup;
  updateForm: FormGroup;
  selected: string = "";
  constructor(
    private fb: FormBuilder,
    private service: NiveauService,
    private notifier: NotifierService
  ) {
    this.addForm = this.fb.group({
      niveauCode: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
      niveauDesc: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]]
    });
    this.updateForm = this.fb.group({
      niveauCode: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
      niveauDesc: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]]
    })
  }

  ngOnInit(): void {
    this.getAllNiveaux();
  }

  /** GET ALL ANNEE UNIV */
  getAllNiveaux() {
    this.service.allNiveaus().subscribe((data) => {
      if (data) {
        this.niveaux = data;
      } else {
        this.notifier.notify('error', 'Le sereur back inaccessible!!!')
      }
    });
  }

  /** ADD NEW YEAR */
  onSubmitAddForm() {
    const n = this.addForm.value;
    this.service.addNiveau(n).subscribe((data) => {
      if (data.status) {
        if (data.status == 'success') {
          let c = document.getElementById('closeAdd');
          c!.click()
          this.notifier.notify(data.status, data.message);
          this.getAllNiveaux();
        } else {
          this.notifier.notify(data.status, data.message);
        }
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!')
      }
    })
  }

  /** MODIFIER ANNEE */
  editNiveau(id: string) {
    this.service.getOneNiveau(id).subscribe((data) => {
      if (data) {
        this.selected = data.niveauId;
        this.updateForm.setValue({
          niveauCode: data.niveauCode,
          niveauDesc: data.niveauDesc
        });
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!')
      }
    })
  }

  deleteNiveau(id: string) {
    this.selected = id;
  }

  onSubmitUpdateForm() {
    const n = this.updateForm.value;
    this.service.updateNiveau(this.selected, n).subscribe((data) => {
      if (data.status) {
        if (data.status == 'success') {
          let c = document.getElementById('closeEdit');
          c!.click();
          this.notifier.notify(data.status, data.message);
          this.getAllNiveaux();
        } else {
          this.notifier.notify(data.status, data.message);
        }
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!')
      }
    })
  }

  deleteNiveauData() {
    this.service.deleteNiveau(this.selected).subscribe((data) => {
      if (data) {
        let c = document.getElementById('closeDelete');
        c!.click();
        this.notifier.notify(data.status, data.message);
        this.getAllNiveaux();
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!');
      }
    })
  }
}
