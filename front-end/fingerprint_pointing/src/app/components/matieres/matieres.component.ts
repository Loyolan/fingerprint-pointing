import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { EnseignantService } from '../../services/enseignant.service';
import { MatiereService } from '../../services/matiere.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ backgroundColor: 'black', opacity: 0 }),
        animate(2000, style({ backgroundColor: 'white', opacity: 1 }))
      ])
    ])
  ]
})
export class MatieresComponent implements OnInit {
  matieres: any[] = [];
  profs: any[] = [];
  addForm: FormGroup;
  updateForm: FormGroup;
  changeForm: FormGroup;
  selected: string = "";
  constructor(
    private fb: FormBuilder,
    private service: MatiereService,
    private profsService: EnseignantService,
    private notifier: NotifierService
  ) {
    this.addForm = this.fb.group({
      prof: ['', Validators.required],
      code: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
      desc: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]]
    });
    this.updateForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
      desc: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]]
    })
    this.changeForm = this.fb.group({
      prof: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getAllMatieres();
    this.getAllProfs();
  }

  /** GET ALL PROFS */
  getAllProfs() {
    this.profsService.allEnseignants().subscribe((data)=>{
      this.profs = data;
    })
  }
  /** GET ALL ANNEE UNIV */
  getAllMatieres() {
    this.service.allMatieres().subscribe((data) => {
      if (data) {
        this.matieres = data;
        for (let i=0; i<this.matieres.length; i++) {
          this.profsService.getOneEnseignant(this.matieres[i].enseignant).subscribe((p)=>{
            this.matieres[i].prof = p.enseignantNomComplet
          })
        }
      } else {
        this.notifier.notify('error', 'Le sereur back inaccessible!!!')
      }
    });
  }

  /** ADD NEW YEAR */
  onSubmitAddForm() {
    const m = this.addForm.value;
    const matiere = {
      matiereCode: m.code,
      matiereDesc: m.desc
    }
    this.service.addMatiere(m.prof, matiere).subscribe((data) => {
      if (data.status) {
        if (data.status == 'success') {
          let c = document.getElementById('closeAdd');
          c!.click()
          this.notifier.notify(data.status, data.message);
          this.getAllMatieres();
        } else {
          this.notifier.notify(data.status, data.message);
        }
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!')
      }
    })
  }

  /** MODIFIER ANNEE */
  editMatiere(id: string) {
    this.service.getOneMatiere(id).subscribe((data) => {
      if (data) {
        this.selected = data.matiereId;
        this.updateForm.setValue({
          code: data.matiereCode,
          desc: data.matiereDesc
        });
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!')
      }
    })
  }

  deleteMatiere(id: string) {
    this.selected = id;
  }

  onSubmitUpdateForm() {
    const m = this.updateForm.value;
    const mat = {
      matiereCode: m.code,
      matiereDesc: m.desc
    }
    this.service.updateMatiere(this.selected, mat).subscribe((data) => {
      if (data.status) {
        if (data.status == 'success') {
          let c = document.getElementById('closeEdit');
          c!.click();
          this.notifier.notify(data.status, data.message);
          this.getAllMatieres();
        } else {
          this.notifier.notify(data.status, data.message);
        }
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!')
      }
    })
  }

  deleteMatiereData() {
    this.service.deleteMatiere(this.selected).subscribe((data) => {
      if (data) {
        let c = document.getElementById('closeDelete');
        c!.click();
        this.notifier.notify(data.status, data.message);
        this.getAllMatieres();
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!');
      }
    })
  }

  changeProf(id: string) {
    this.selected = id;
  }

  onSubmitChangeForm() {
    const id_prof = this.changeForm.value.prof;
    this.service.changeEnseignant(this.selected, id_prof).subscribe((data)=>{
      if (data.status) {
        if (data.status == 'success') {
          let c = document.getElementById('closeChange');
          c!.click();
          this.notifier.notify(data.status, data.message);
          this.getAllMatieres();
        } else {
          this.notifier.notify(data.status, data.message);
        }
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!')
      }
    })
  }
}
