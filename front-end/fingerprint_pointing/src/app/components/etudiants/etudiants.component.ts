import { Component, OnInit } from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';
import { AnneeUnivService } from '../../services/annee-univ.service';
import { ParcoursService } from '../../services/parcours.service';
import { NiveauService } from '../../services/niveau.service';
import { EtudiantService } from '../../services/etudiant.service';
import { NotifierService } from 'angular-notifier';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({backgroundColor: 'black', opacity: 0}),
        animate(1000, style({backgroundColor: 'white', opacity: 1}))
      ])
    ])
  ]
})
export class EtudiantsComponent implements OnInit {

  annees: any[] = [];
  parcours: any[] = [];
  niveaux: any[] = [];
  etudiants: any[] = [];
  selectedAnnee: any = {"anneeUnivDesc": "", "anneeUnivId": ""};
  selectedParcours: any = {"parcoursCode": "PARCOURS", "parcoursId": "TOUT"};
  selectedNiveau: any = {"niveauCode": "NIVEAUX", "niveauId": "TOUT"};
  titre: string = "LISTE DE TOUS LES ETUDIANTS";
  addForm: FormGroup;
  addExcelForm: FormGroup;
  updateForm: FormGroup;
  exportDataForm: FormGroup;
  link: string = "";
  selected: string = "";

  constructor(
    private service: EtudiantService,
    private anneeService: AnneeUnivService,
    private parcoursService: ParcoursService,
    private niveauService: NiveauService,
    private notifier: NotifierService,
    private fb: FormBuilder
  ) {
    
    this.addForm = this.fb.group({
      etudiantNum: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
      etudiantNomComplet: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
      etudiantMatricule: ['', [Validators.required, Validators.minLength(6)]],
      etudiantSexe: [1, [Validators.required]]
    });
    this.addExcelForm = this.fb.group({
      file: [null, [Validators.required]],
      fileSource: ['', [Validators.required]],
    })
    this.updateForm = this.fb.group({
      etudiantNum: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
      etudiantNomComplet: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
      etudiantMatricule: ['', [Validators.required, Validators.minLength(6)]]
    })
    const deb = new Date();
    const fin = deb.getTime() + 31536000000;
    const d = deb.toISOString().slice(0, 10);
    const f = new Date(fin).toISOString().slice(0, 10);
    this.exportDataForm = this.fb.group({
      eff_time: [d, [Validators.required]],
      exp: [f, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getAllAnneeUnivs();
  }

  /** GET ALL ANNEE */
  getAllAnneeUnivs() {
    this.anneeService.allAnneeUnivs().subscribe((data) => {
      this.annees = data;
      for(let i = 0; i < this.annees.length; i++) {
        if(this.annees[i].anneeEncours == true) {
          this.selectedAnnee = this.annees[i];
          this.notifier.notify("info", "Chargement encours du requête...")
          setTimeout(()=>{
            this.getAllParcours(this.annees[i].anneeUnivId);
            this.getAllNiveaux(this.annees[i].anneeUnivId);
            this.getAllEtudiants(this.annees[i].anneeUnivId);
          }, 1000);
        }
      }
    })
  }

  /** GET ALL PARCOURS */
  getAllParcours(id_annee: string) {
    this.parcoursService.allParcours().subscribe((data) => {
      this.parcours = data;
      for(let i = 0; i < this.parcours.length; i++) {
        this.service.allEtudiantsAnneeUnivParcours(id_annee, this.parcours[i].parcoursId).subscribe((data) => {
          this.parcours[i].nb = data.length;
        })
      }
    });
  }

  /** GET ALL NIVEAUX */
  getAllNiveaux(id_annee: string) {
    this.niveauService.allNiveaus().subscribe((data) => {
      this.niveaux = data;
      for(let i = 0; i < this.niveaux.length; i++) {
        this.service.allEtudiantsAnneeUnivNiveau(id_annee, this.niveaux[i].niveauId).subscribe((data) => {
          this.niveaux[i].nb = data.length;
        })
      }
    });
  }

  /** GET ALL ETUDIANTS */
  getAllEtudiants(id_annee: string) {
    this.service.allEtudiantsAnneeUniv(id_annee).subscribe((data) => {
      this.etudiants = data;
    })
  }

  /** GET ALL ETUDIANTS (PARCOURS) */
  getAllEtudiantsP(id_annee: string, id_parcours: string) {
    this.service.allEtudiantsAnneeUnivParcours(id_annee, id_parcours).subscribe((data) => {
      this.etudiants = data;
    })
  }

  /** GET ALL ETUDIANTS (NIVEAU) */
  getAllEtudiantsN(id_annee: string, id_niveau: string) {
    this.service.allEtudiantsAnneeUnivNiveau(id_annee, id_niveau).subscribe((data) => {
      this.etudiants = data;
    })
  }

  /** GET ALL ETUDIANTS (PARCOURS/NIVEAUX) */
  getAllEtudiantsNP(id_annee: string, id_niveau: string, id_parcours: string) {
    this.service.allEtudiantsAnneeUnivNiveauParcours(id_annee, id_niveau, id_parcours).subscribe((data) => {
      this.etudiants = data;
    })
  }

  changeAnnee(id: string) {
    this.anneeService.getOneAnneeUniv(id).subscribe((data)=>{
      this.selectedAnnee = data;
      this.getAllEtudiants(data.anneeUnivId);
    })
  }

  onChangeDetectN(id: string) {
    if (id == 'TOUT') {
      this.selectedNiveau = {"niveauCode": "NIVEAUX", "niveauId": "TOUT"};
      this.notifier.notify("info", "Chargement encours du requête...")
      setTimeout(()=>{
        if(this.selectedParcours.parcoursId == "TOUT") {
          this.getAllEtudiants(this.selectedAnnee.anneeUnivId);
          this.titre = `LISTE DE TOUT LES ETUDIANTS`
        } else{
          this.getAllEtudiantsP(this.selectedAnnee.anneeUnivId, this.selectedParcours.parcoursId);
          this.titre = `LISTE DES ETUDIANTS (${this.selectedParcours.parcoursCode})`;
        }
      }, 1000);
    } else {
      this.niveauService.getOneNiveau(id).subscribe((data)=>{
        this.selectedNiveau = data;
        this.notifier.notify("info", "Chargement encours du requête...")
        setTimeout(()=>{
          if(this.selectedParcours.parcoursId == "TOUT") {
            this.getAllEtudiantsN(this.selectedAnnee.anneeUnivId, data.niveauId);
            this.titre = `${data.niveauDesc}`
          } else{
            this.getAllEtudiantsNP(this.selectedAnnee.anneeUnivId, data.niveauId, this.selectedParcours.parcoursId);
            this.titre = `${data.niveauDesc} (${this.selectedParcours.parcoursCode})`;
          }
        }, 1000);
      })
    }
  }

  onChangeDetectP(id: string) {
    if (id == 'TOUT') {
      this.selectedParcours = {"parcoursCode": "PARCOURS", "parcoursId": "TOUT"};
      this.notifier.notify("info", "Chargement encours du requête...")
      setTimeout(()=>{
        if(this.selectedNiveau.niveauId == "TOUT") {
          this.getAllEtudiants(this.selectedAnnee.anneeUnivId);
          this.titre = `LISTE DE TOUS LES ETUDIANTS`
        } else {
          this.getAllEtudiantsN(this.selectedAnnee.anneeUnivId, this.selectedNiveau.niveauId);
          this.titre = `${this.selectedNiveau.niveauDesc}`;
        }
      }, 1000);
    } else {
      this.parcoursService.getOneParcours(id).subscribe(data => {
        this.selectedParcours = data;
        this.notifier.notify("info", "Chargement encours du requête...")
        setTimeout(()=>{
          if(this.selectedNiveau.niveauId == "TOUT") {
            this.getAllEtudiantsP(this.selectedAnnee.anneeUnivId, data.parcoursId);
            this.titre = `LISTE DE TOUS LES ETUDIANTS ${data.parcoursCode}`
          } else {
            this.getAllEtudiantsNP(this.selectedAnnee.anneeUnivId, this.selectedNiveau.niveauId, data.parcoursId);
            this.titre = `${this.selectedNiveau.niveauDesc} (${data.parcoursCode})`;
          }
        }, 1000);
      });
    }
  }

  onSubmitAddForm(){
    const etudiant = this.addForm.value;
    this.service.addEtudiant(this.selectedAnnee.anneeUnivId, this.selectedNiveau.niveauId, this.selectedParcours.parcoursId, etudiant).subscribe((data)=> {
      if (data) {
        if (data.status == 'success') {
          let c = document.getElementById('closeAdd');
          c!.click();
          this.notifier.notify('success', data.message);
          this.getAllEtudiantsNP(this.selectedAnnee.anneeUnivId, this.selectedNiveau.niveauId, this.selectedParcours.parcoursId);
        } else {
          this.notifier.notify(data.status, data.message);
        }
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!')
      }
    });
  }

  onFileChange(e: Event) {
    const element = event?.target as HTMLInputElement;
    let files : FileList | null = element.files;
    if(files) { 
      this.addExcelForm.patchValue({
        fileSource: files[0]
      });
      this.addExcelForm.get('fileSource')?.updateValueAndValidity();
    }
  }

  onSubmitAddExcelForm(){
    const formData: FormData = new FormData();
    const file = this.addExcelForm.value['fileSource'];
    formData.append('file', file);
    this.service.addEtudiantViaExcelData(this.selectedAnnee.anneeUnivId, this.selectedNiveau.niveauId, this.selectedParcours.parcoursId, formData).subscribe((data)=> {
      if (data) {
        if (data.status == 'success') {
          let c = document.getElementById('closeAddExcel');
          c!.click();
          this.notifier.notify('success', data.message);
          this.getAllEtudiantsNP(this.selectedAnnee.anneeUnivId, this.selectedNiveau.niveauId, this.selectedParcours.parcoursId);
        } else {
          this.notifier.notify(data.status, data.message);
        }
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!')
      }
    });
  }

  editEtudiant(id: string) {
    this.service.getOneEtudiant(id).subscribe((data)=>{
      if (data) {
        this.selected = data.etudiantId;
        this.updateForm.setValue({
          etudiantNum: data.etudiantNum,
          etudiantNomComplet: data.etudiantNomComplet,
          etudiantMatricule: data.etudiantMatricule
        });
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!')
      }
    })
  }

  deleteEtudiant(id: string) {
    this.selected = id;
  }

  onSubmitUpdateForm() {
    const etudiant = this.updateForm.value;
    this.service.updateEtudiant(this.selected, etudiant).subscribe((data)=> {
      if (data) {
        if (data.status == 'success') {
          let c = document.getElementById('closeEdit');
          c!.click();
          this.notifier.notify('success', data.message);
          if (this.selectedParcours.parcoursId != 'TOUT' && this.selectedNiveau.niveauId != 'TOUT') {
            this.getAllEtudiantsNP(this.selectedAnnee.anneeUnivId, this.selectedNiveau.niveauId, this.selectedParcours.parcoursId);
          } else if (this.selectedParcours.parcoursId == 'TOUT' && this.selectedNiveau.niveauId != 'TOUT') {
            this.getAllEtudiantsN(this.selectedAnnee.anneeUnivId, this.selectedNiveau.niveauId);
          } else if(this.selectedParcours.parcoursId != 'TOUT' && this.selectedNiveau.niveauId == 'TOUT') {
            this.getAllEtudiantsP(this.selectedAnnee.anneeUnivId, this.selectedParcours.parcoursId);
          } else {
            this.getAllEtudiants(this.selectedAnnee.anneeUnivId);
          }
        } else {
          this.notifier.notify(data.status, data.message);
        }
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!')
      }
    });
  }

  deleteEtudiantData() {
    this.service.deleteEtudiant(this.selected).subscribe((data)=> {
      if (data) {
        if (data.status == 'success') {
          let c = document.getElementById('closeDelete');
          c!.click();
          this.notifier.notify('success', data.message);
          if (this.selectedParcours.parcoursId != 'TOUT' && this.selectedNiveau.niveauId != 'TOUT') {
            this.getAllEtudiantsNP(this.selectedAnnee.anneeUnivId, this.selectedNiveau.niveauId, this.selectedParcours.parcoursId);
          } else if (this.selectedParcours.parcoursId == 'TOUT' && this.selectedNiveau.niveauId != 'TOUT') {
            this.getAllEtudiantsN(this.selectedAnnee.anneeUnivId, this.selectedNiveau.niveauId);
          } else if(this.selectedParcours.parcoursId != 'TOUT' && this.selectedNiveau.niveauId == 'TOUT') {
            this.getAllEtudiantsP(this.selectedAnnee.anneeUnivId, this.selectedParcours.parcoursId);
          } else {
            this.getAllEtudiants(this.selectedAnnee.anneeUnivId);
          }
        } else {
          this.notifier.notify(data.status, data.message);
        }
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!')
      }
    });
  }

  deleteAllEtudiant() {
    this.notifier.notify('error', 'Suppression des donnees multiples');
    setTimeout(()=>{
      this.notifier.notify('warning', 'L\'operation est irreversible');
    }, 3000)
  }

  deleteAllEtudiantData() {
    this.service.deleteEtudiantNP(this.selectedAnnee.anneeUnivId, this.selectedNiveau.niveauId, this.selectedParcours.parcoursId).subscribe((data)=>{
      if (data) {
        if (data.status == 'success') {
          let c = document.getElementById('closeDeleteAll');
          c!.click();
          this.notifier.notify('success', data.message);
          this.getAllEtudiantsNP(this.selectedAnnee.anneeUnivId, this.selectedNiveau.niveauId, this.selectedParcours.parcoursId);
        } else {
          this.notifier.notify(data.status, data.message);
        }
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!');
      }
    });
  }

  onSubmitExportDataForm() {
    this.notifier.notify('info', 'Preparation du lien!!!');
    const date = this.exportDataForm.value;
    const eff = date.eff_time;
    const exp = date.exp;
    setTimeout(()=> {
      this.notifier.notify('info', 'Votre lien de telechargement sera pret dans 5s');
      setTimeout(()=>{
        this.link = this.service.getExportData(this.selectedAnnee.anneeUnivId, this.selectedNiveau.niveauId, this.selectedParcours.parcoursId, eff, exp);
      }, 5000);
    }, 3000)
  }

  afterDowload() {
    setTimeout(()=>{
      this.notifier.notify('success', 'Exportation des etudiants effectuée');
      window.open(this.link);
      setTimeout(()=>{
        let c = document.getElementById('closeExportExcel');
        c!.click();
        this.link = '';
      }, 1000)
    }, 3000)
  }
}
