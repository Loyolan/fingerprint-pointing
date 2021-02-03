import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ParcoursService } from '../../services/parcours.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-parcours',
  templateUrl: './parcours.component.html',
  styleUrls: ['./parcours.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ backgroundColor: 'black', opacity: 0 }),
        animate(2000, style({ backgroundColor: 'white', opacity: 1 }))
      ])
    ])
  ]
})
export class ParcoursComponent implements OnInit {
  parcours: any[] = [];
  addForm: FormGroup;
  updateForm: FormGroup;
  selected: string = "";
  constructor(
    private fb: FormBuilder,
    private service: ParcoursService,
    private notifier: NotifierService
  ) {
    this.addForm = this.fb.group({
      parcoursCode: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
      parcoursDesc: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]]
    });
    this.updateForm = this.fb.group({
      parcoursCode: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
      parcoursDesc: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]]
    })
  }

  ngOnInit(): void {
    this.getAllParcours();
  }

  /** GET ALL ANNEE UNIV */
  getAllParcours() {
    this.service.allParcours().subscribe((data) => {
      if (data) {
        this.parcours = data;
      } else {
        this.notifier.notify('error', 'Le sereur back inaccessible!!!')
      }
    });
  }

  /** ADD NEW YEAR */
  onSubmitAddForm() {
    const n = this.addForm.value;
    this.service.addParcours(n).subscribe((data) => {
      if (data.status) {
        if (data.status == 'success') {
          let c = document.getElementById('closeAdd');
          c!.click()
          this.notifier.notify(data.status, data.message);
          this.getAllParcours();
        } else {
          this.notifier.notify(data.status, data.message);
        }
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!')
      }
    })
  }

  /** MODIFIER ANNEE */
  editParcours(id: string) {
   
    this.service.getOneParcours(id).subscribe((data) => {
      if (data) {
        this.selected = data.parcoursId;
        this.updateForm.setValue({
          parcoursCode: data.parcoursCode,
          parcoursDesc: data.parcoursDesc
        });
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!')
      }
    })
  }

  deleteParcours(id: string) {
    this.selected = id;
  }

  onSubmitUpdateForm() {
    const n = this.updateForm.value;
    this.service.updateParcours(this.selected, n).subscribe((data) => {
      if (data.status) {
        if (data.status == 'success') {
          let c = document.getElementById('closeEdit');
          c!.click();
          this.notifier.notify(data.status, data.message);
          this.getAllParcours();
        } else {
          this.notifier.notify(data.status, data.message);
        }
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!')
      }
    })
  }

  deleteParcoursData() {
    this.service.deleteParcours(this.selected).subscribe((data) => {
      if (data) {
        let c = document.getElementById('closeDelete');
        c!.click();
        this.notifier.notify(data.status, data.message);
        this.getAllParcours();
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!');
      }
    })
  }
}
