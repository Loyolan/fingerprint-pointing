import { Component, OnInit } from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';
import { PointageService } from './../../services/pointage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ParcoursService } from './../../services/parcours.service';
import { NiveauService } from './../../services/niveau.service';
@Component({
  selector: 'app-pointage',
  templateUrl: './pointage.component.html',
  styleUrls: ['./pointage.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({backgroundColor: 'black', opacity: 0}),
        animate(2000, style({backgroundColor: 'white', opacity: 1}))
      ])
    ])
  ]
})
export class PointageComponent implements OnInit {

  pointages: any[] = [];
  titre: string = 'Tous les pointages (Evenements Enregistrés)';
  niveauParcoursSelected: any = {
    'niveau': {
      niveauId: 'TOUT',
      niveauCode: 'TOUT'
    },
    'parcours': {
      parcoursId: 'TOUT',
      parcoursCode: ''
    }
  }
  niveauxParcours: any[] = [{
    'niveau': {
      niveauId: 'TOUT',
      niveauCode: 'TOUT'
    },
    'parcours': {
      parcoursId: 'TOUT',
      parcoursCode: ''
    }
  }];
  selected: string = '';
  limit: number = 50;
  link: string = '';
  dateForm: FormGroup;
  limitForm: FormGroup;
  anneeForm: FormGroup;
  constructor(
    private service: PointageService,
    private fb: FormBuilder,
    private notifier: NotifierService,
    private niveauService: NiveauService,
    private parcoursService: ParcoursService
  ) { 
    this.dateForm = this.fb.group({
      debut: ['', [Validators.required]],
      fin: ['', [Validators.required]]
    });
    this.limitForm = this.fb.group({
      limit: [50, [Validators.required]]
    });
    this.anneeForm = this.fb.group({
      annee: [new Date().getFullYear(), [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });
  }

  ngOnInit(): void {
    this.getNiveauxParcours();
    this.getAllPointages();
  }

  getNiveauxParcours() {
    this.niveauService.allNiveaus().subscribe((niveaux)=>{
      for(let i=0; i<niveaux.length; i++){
        this.parcoursService.allParcours().subscribe((parcours) => {
          for(let j=0; j<parcours.length; j++){
            this.niveauxParcours.push(
              {
                niveau: niveaux[i],
                parcours: parcours[j]
              }
            );
          }
        });
      }
    })
  }

  getClass(in_: string, out_: string): string {
    if(in_ == 'NO' && out_ == 'NO') {
      return 'bg-danger text-white';
    } else if (in_ == 'YES' && out_ == 'YES') {
      return '';
    } else {
      return 'bg-warning';
    }
  }

  getAllPointages() {
    this.service.allPointages(this.limit).subscribe((data) => {
      if (data.status) {
        this.notifier.notify(data.status, data.message);
      } else {
        this.pointages = data;
      }
    });
  }

  search2Datetime() {
    if (this.dateForm.invalid) {
      this.notifier.notify('warning', 'Datetime début/fin ne peut pas être null');
      this.changeNiveauParcours('TOUT', 'TOUT');
    } else {
      if (this.niveauParcoursSelected.niveau.niveauId == 'TOUT') {
        const date = this.dateForm.value;
        const d = date.debut;
        const f = date.fin;
        const deb = new Date(d);
        const fin = new Date(f);
        if (deb > fin) {
          this.notifier.notify('error', 'Datetime début doit inferieur à Date fin');
        } else {
          const tzoff = (new Date()).getTimezoneOffset() * 60000;
          const iso_deb = (new Date(deb.getTime() - tzoff)).toISOString();
          const iso_fin = (new Date(fin.getTime() - tzoff)).toISOString();
          this.service.allPointagesDate(iso_deb, iso_fin).subscribe((data)=> {
            if (data.status) {
              this.notifier.notify(data.status, data.message);
            } else {
              this.titre = `Pointages entre ${deb.toLocaleDateString()} [${deb.toLocaleTimeString()}] et ${fin.toLocaleDateString()} [${fin.toLocaleTimeString()}]`;
              this.pointages = data;
            }
          })
        }
      } else {
        const date = this.dateForm.value;
        const d = date.debut;
        const f = date.fin;
        const deb = new Date(d);
        const fin = new Date(f);
        if (deb > fin) {
          this.notifier.notify('error', 'Datetime début/fin doit inferieur à Date fin');
        } else {
          const tzoff = (new Date()).getTimezoneOffset() * 60000;
          const iso_deb = (new Date(deb.getTime() - tzoff)).toISOString();
          const iso_fin = (new Date(fin.getTime() - tzoff)).toISOString();
          this.service.allPointagesNPDate(this.niveauParcoursSelected.niveau.niveauId, this.niveauParcoursSelected.parcours.parcoursId, iso_deb, iso_fin).subscribe((data)=> {
            if (data.status) {
              this.notifier.notify(data.status, data.message);
            } else {
              this.titre = `Pointages de ${this.niveauParcoursSelected.niveau.niveauCode}/${this.niveauParcoursSelected.parcours.parcoursCode} entre ${deb.toLocaleDateString()} [${deb.toLocaleTimeString()}] et ${fin.toLocaleDateString()} [${fin.toLocaleTimeString()}]`;
              this.pointages = data;
            }
          })
        }
      }
    }
  }

  changeDebut() {
    if (this.dateForm.invalid) {
      this.notifier.notify('info', 'Attente du Datetime fin')
    } else {
      this.search2Datetime();
    }
  }

  changeLimit() {
    let l = this.limitForm.value.limit;
    this.limit = l;
    if (this.niveauParcoursSelected.niveau.niveauId == 'TOUT') {
      this.getAllPointages();
    } else {
      this.changeNiveauParcours(this.niveauParcoursSelected.niveau.niveauId, this.niveauParcoursSelected.parcours.parcoursId);
    }
  }

  changeNiveauParcours(id_niveau: string, id_parcours: string) {
    if (id_niveau == 'TOUT' && id_parcours == 'TOUT') {
      this.niveauParcoursSelected = {
        'niveau': {
          niveauId: 'TOUT',
          niveauCode: 'TOUT'
        },
        'parcours': {
          parcoursId: 'TOUT',
          parcoursCode: ''
        }
      }
      if (this.dateForm.invalid) {
        this.titre = 'Tous les pointages (Enregistrés)';
        this.getAllPointages();
      } else {
        this.search2Datetime();
      }
    } else {

      if (this.dateForm.invalid) {
        this.niveauService.getOneNiveau(id_niveau).subscribe(data => {
          this.niveauParcoursSelected.niveau = data;
        });
        this.parcoursService.getOneParcours(id_parcours).subscribe((data)=>{
          this.niveauParcoursSelected.parcours = data;
        });
        this.service.allPointagesNP(id_niveau, id_parcours, this.limit).subscribe((data)=>{
          if (data.status) {
            this.notifier.notify(data.status, data.message);
          } else {
            this.titre = `Tous les Pointages de ${this.niveauParcoursSelected.niveau.niveauCode}/${this.niveauParcoursSelected.parcours.parcoursCode}`;
            this.pointages = data;
          }
        })
      } else {
        const date = this.dateForm.value;
        const d = date.debut;
        const f = date.fin;
        const deb = new Date(d);
        const fin = new Date(f);
        if (deb > fin) {
          this.notifier.notify('error', 'Datetime début doit inferieur à Date fin');
        } else {
          this.niveauService.getOneNiveau(id_niveau).subscribe(data => {
            this.niveauParcoursSelected.niveau = data;
          });
          this.parcoursService.getOneParcours(id_parcours).subscribe((data)=>{
            this.niveauParcoursSelected.parcours = data;
          });
          const tzoff = (new Date()).getTimezoneOffset() * 60000;
          const iso_deb = (new Date(deb.getTime() - tzoff)).toISOString();
          const iso_fin = (new Date(fin.getTime() - tzoff)).toISOString();
          this.service.allPointagesNPDate(id_niveau, id_parcours, iso_deb, iso_fin).subscribe((data)=> {
            if (data.status) {
              this.notifier.notify(data.status, data.message);
            } else {
              this.titre = `Pointages de ${this.niveauParcoursSelected.niveau.niveauCode}/${this.niveauParcoursSelected.parcours.parcoursCode} entre ${deb.toLocaleDateString()} [${deb.toLocaleTimeString()}] et ${fin.toLocaleDateString()} [${fin.toLocaleTimeString()}]`;
              this.pointages = data;
            }
          })
        }
      }
    }
  }

  deleteAllPointages() {
    const date = this.dateForm.value;
    const d = date.debut;
    const f = date.fin;
    const deb = new Date(d);
    const fin = new Date(f);
    if (deb > fin) {
      this.notifier.notify('error', 'Datetime début doit inferieur à Date fin');
    } else {
      const tzoff = (new Date()).getTimezoneOffset() * 60000;
      const iso_deb = (new Date(deb.getTime() - tzoff)).toISOString();
      const iso_fin = (new Date(fin.getTime() - tzoff)).toISOString();
      this.service.deleteAllPointagesNPDate(this.niveauParcoursSelected.niveau.niveauId, this.niveauParcoursSelected.parcours.parcoursId, iso_deb, iso_fin).subscribe((d) => {
        if (d.status == 'success') {
          this.notifier.notify(d.status, d.message);
          const c = document.getElementById('closeDeleteAll');
          c!.click()
          this.service.allPointagesDate(iso_deb, iso_fin).subscribe((data)=> {
            if (data.status) {
              this.notifier.notify(data.status, data.message);
            } else {
              this.changeNiveauParcours(this.niveauParcoursSelected.niveau.niveauId, this.niveauParcoursSelected.parcours.parcoursId);
            }
          })
        } else {
          this.notifier.notify(d.status, d.message);
        }
      })
  }
  }

  deletePointage(id: string) {
    this.selected = id;
  }

  deletePointageData() {
    this.service.deletePointage(this.selected).subscribe((data)=>{
      if (data) {
        if(data.status == 'success') {
          this.notifier.notify('success', data.message);
          const c = document.getElementById('closeDelete');
          c!.click()
          this.changeNiveauParcours('TOUT', 'TOUT')
        } else {
          this.notifier.notify(data.status, data.message);
        }
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!');
      }
    });
  }

  getLink() {
    this.notifier.notify('info', 'Preparation du lien!!!');
    let annee =  `${this.anneeForm.value.annee}`;
    setTimeout(()=> {
      this.notifier.notify('info', 'Votre lien de telechargement sera pret dans 5s');
      setTimeout(()=>{
        this.link = this.service.getDatasets(annee);
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
