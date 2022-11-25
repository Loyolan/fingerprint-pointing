import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { AnneeUnivService } from '../../services/annee-univ.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-annee-univ',
  templateUrl: './annee-univ.component.html',
  styleUrls: ['./annee-univ.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ backgroundColor: 'black', opacity: 0 }),
        animate(2000, style({ backgroundColor: 'white', opacity: 1 }))
      ])
    ])
  ]
})
export class AnneeUnivComponent implements OnInit {

  annees: any[] = [];
  addForm: FormGroup;
  updateForm: FormGroup;
  selected: string = "";
  constructor(
    private fb: FormBuilder,
    private service: AnneeUnivService,
    private notifier: NotifierService
  ) { 
    this.addForm = this.fb.group({
      year1: [new Date().getFullYear(), [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      year2: [new Date().getFullYear() + 1]
    });
    this.updateForm = this.fb.group({
      year1: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      year2: ['']
    })
  }

  ngOnInit(): void {
    this.getAllAnneeUniv();
  }

  /** GET ALL ANNEE UNIV */
  getAllAnneeUniv(){
    this.service.allAnneeUnivs().subscribe((data)=>{
      if(data){
        this.annees = data;
      } else {
        this.notifier.notify('error', 'Le sereur back inaccessible!!!')
      }
    });
  }

  /** ADD NEW YEAR */
  onSubmitAddForm() {
    const annee = this.addForm.value;
    const a = {
      anneeUnivDesc: annee.year1 + "-" + annee.year2
    }
    this.service.addAnneeUniv(a).subscribe((data) => {
      if (data.status){
        if (data.status == 'success') {
          let c = document.getElementById('closeAdd');
          c!.click()
          this.notifier.notify(data.status, data.message);
          this.getAllAnneeUniv();
        } else {
          this.notifier.notify(data.status, data.message);
        }
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!')
      }
    })
  }

  /** MODIFIER ANNEE */
  editAnneeUniv(id: string) {
    this.service.getOneAnneeUniv(id).subscribe((data)=>{
      if (data) {
        this.selected = data.anneeUnivId;
        this.updateForm.setValue({
          year1: data.anneeUnivDesc.split('-')[0],
          year2: data.anneeUnivDesc.split('-')[1]
        });
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!')
      }
    })
  }

  deleteAnneeUniv(id: string) {
    this.selected = id;
  }

  setAnnee2() {
    if (Number(this.addForm.value['year1']) != new Date().getFullYear()) {
      this.notifier.notify('warning', 'Année universitaire ne correspond pas a l\'annee encours');
    }
    this.addForm.setValue({
      year1: this.addForm.value['year1'],
      year2: Number(this.addForm.value['year1']) + 1
    })
    this.updateForm.setValue({
      year1: this.updateForm.value['year1'],
      year2: Number(this.updateForm.value['year1']) + 1
    })
  }

  onSubmitUpdateForm() {
    const annee = this.updateForm.value;
    const a = {
      anneeUnivDesc: annee.year1 + "-" + annee.year2
    }
    this.service.updateAnneeUniv(this.selected, a).subscribe((data) => {
      if (data.status) {
        if (data.status == 'success') {
          let c = document.getElementById('closeEdit');
          c!.click();
          this.notifier.notify(data.status, data.message);
          this.getAllAnneeUniv();
        } else {
          this.notifier.notify(data.status, data.message);
        }
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!')
      }
    })
  }

  deleteAnnee() {
    this.service.deleteAnneeUniv(this.selected).subscribe((data) => {
      if (data) {
        let c = document.getElementById('closeDelete');
        c!.click();
        this.notifier.notify(data.status, data.message);
        this.getAllAnneeUniv();
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!');
      }
    })
  }

  activate(id: string) {
    this.service.activateAnneeUniv(id).subscribe((data) => {
      if (data) {
        this.notifier.notify(data.status, data.message);
        this.getAllAnneeUniv();
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!');
      }
    })
  }
}
