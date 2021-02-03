import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { EnseignantService } from '../../services/enseignant.service';
import { MatiereService } from '../../services/matiere.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-profs',
  templateUrl: './profs.component.html',
  styleUrls: ['./profs.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ backgroundColor: 'black', opacity: 0 }),
        animate(2000, style({ backgroundColor: 'white', opacity: 1 }))
      ])
    ])
  ]
})
export class ProfsComponent implements OnInit {

  profs: any[] = [];
  mats: any[] = [];
  addForm: FormGroup;
  updateForm: FormGroup;
  selected: string = "";
  constructor(
    private fb: FormBuilder,
    private matiereService: MatiereService,
    private service: EnseignantService,
    private notifier: NotifierService
  ) {
    this.addForm = this.fb.group({
      enseignantCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      enseignantNomComplet: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]]
    });
    this.updateForm = this.fb.group({
      enseignantCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      enseignantNomComplet: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]]
    })
  }

  ngOnInit(): void {
    this.getMatieres();
    this.getAllEnseignants();
  }

  /** GET ALL ANNEE UNIV */
  getAllEnseignants() {
    this.service.allEnseignants().subscribe((data) => {
      if (data) {
        this.profs = data
        for(let i=0; i<this.profs.length; i++) {
          let mats = [];
          for(let j=0; j<this.mats.length; j++) {
            if(this.mats[j].enseignant == this.profs[i].enseignantId) {
              mats.push(this.mats[j].matiereCode);
            }
          }
          this.profs[i].matieres = mats
        }
      } else {
        this.notifier.notify('error', 'Le sereur back inaccessible!!!')
      }
    });
  }

  /** GET MATIERES */
  getMatieres() {
    this.matiereService.allMatieres().subscribe((m) => {
      this.mats = m;
    })
  }

  /** ADD NEW YEAR */
  onSubmitAddForm() {
    const n = this.addForm.value;
    this.service.addEnseignant(n).subscribe((data) => {
      if (data.status) {
        if (data.status == 'success') {
          let c = document.getElementById('closeAdd');
          c!.click()
          this.notifier.notify(data.status, data.message);
          this.getAllEnseignants();
        } else {
          this.notifier.notify(data.status, data.message);
        }
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!')
      }
    })
  }

  /** MODIFIER ANNEE */
  editEnseignant(id: string) {

    this.service.getOneEnseignant(id).subscribe((data) => {
      if (data) {
        this.selected = data.enseignantId;
        this.updateForm.setValue({
          enseignantCode: data.enseignantCode,
          enseignantNomComplet: data.enseignantNomComplet
        });
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!')
      }
    })
  }

  deleteEnseignant(id: string) {
    this.selected = id;
  }

  onSubmitUpdateForm() {
    const n = this.updateForm.value;
    this.service.updateEnseignant(this.selected, n).subscribe((data) => {
      if (data.status) {
        if (data.status == 'success') {
          let c = document.getElementById('closeEdit');
          c!.click();
          this.notifier.notify(data.status, data.message);
          this.getAllEnseignants();
        } else {
          this.notifier.notify(data.status, data.message);
        }
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!')
      }
    })
  }

  deleteEnseignantData() {
    this.service.deleteEnseignant(this.selected).subscribe((data) => {
      if (data) {
        let c = document.getElementById('closeDelete');
        c!.click();
        this.notifier.notify(data.status, data.message);
        this.getAllEnseignants();
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!');
      }
    })
  }
}
