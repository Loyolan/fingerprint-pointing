import { Component, OnInit } from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';
import { EventsService } from './../../services/events.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ParcoursService } from './../../services/parcours.service';
import { NiveauService } from './../../services/niveau.service';
import { MatiereService } from '../../services/matiere.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({backgroundColor: 'black', opacity: 0}),
        animate(2000, style({backgroundColor: 'white', opacity: 1}))
      ])
    ])
  ]
})
export class EventsComponent implements OnInit {

  events: any[] = [];
  titre: string = 'Tous les evenements Non Enregistrés';
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
  matieres: any[] = [];
  dateForm: FormGroup;
  saveForm: FormGroup;
  selected: string = "";
  constructor(
    private service: EventsService,
    private fb: FormBuilder,
    private notifier: NotifierService,
    private niveauService: NiveauService,
    private parcoursService: ParcoursService,
    private matiereService: MatiereService
  ) { 
    this.dateForm = this.fb.group({
      debut: ['', [Validators.required]],
      fin: ['', [Validators.required]]
    });
    this.saveForm = this.fb.group({
      datetimeDebut: ['', [Validators.required]],
      datetimeFin: ['', [Validators.required]],
      matiere: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getNiveauxParcours();
    this.getAllEvents();
    this.getMatieres();
  }

  getMatieres() {
    this.matiereService.allMatieres().subscribe((data)=>{
      this.matieres = data;
    })
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

  getAllEvents() {
    this.service.allEvents().subscribe((data) => {
      this.events = data;
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
          this.service.allEventsDate(iso_deb, iso_fin).subscribe((data)=> {
            this.titre = `Evenements entre ${deb.toLocaleDateString()} [${deb.toLocaleTimeString()}] et ${fin.toLocaleDateString()} [${fin.toLocaleTimeString()}]`;
            this.events = data;
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
          this.service.allEventsNPDate(this.niveauParcoursSelected.niveau.niveauId, this.niveauParcoursSelected.parcours.parcoursId, iso_deb, iso_fin).subscribe((data)=> {
            this.titre = `Evenements de ${this.niveauParcoursSelected.niveau.niveauCode}/${this.niveauParcoursSelected.parcours.parcoursCode} entre ${deb.toLocaleDateString()} [${deb.toLocaleTimeString()}] et ${fin.toLocaleDateString()} [${fin.toLocaleTimeString()}]`;
            this.events = data;
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
        this.titre = 'Tous les evenements Enregistrés';
        this.getAllEvents();
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
        this.service.allEventsNP(id_niveau, id_parcours).subscribe((data)=>{
          this.titre = `Tous les Evenements de ${this.niveauParcoursSelected.niveau.niveauCode}/${this.niveauParcoursSelected.parcours.parcoursCode}`;
          this.events = data;
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
          this.service.allEventsNPDate(id_niveau, id_parcours, iso_deb, iso_fin).subscribe((data)=> {
            this.titre = `Evenements de ${this.niveauParcoursSelected.niveau.niveauCode}/${this.niveauParcoursSelected.parcours.parcoursCode} entre ${deb.toLocaleDateString()} [${deb.toLocaleTimeString()}] et ${fin.toLocaleDateString()} [${fin.toLocaleTimeString()}]`;
            this.events = data;
          })
        }
      }
    }
  }

  save() {
    const date = this.dateForm.value;
    const d = date.debut;
    const f = date.fin;
    const deb = new Date(d);
    const fin = new Date(f);
    if (deb > fin) {
      this.notifier.notify('error', 'Datetime début doit inferieur à Date fin');
      const c = document.getElementById('closeSave');
      setTimeout(()=>{
        c!.click();
      }, 1000)
    } else {
      this.saveForm.setValue({
        datetimeDebut: d,
        datetimeFin: f,
        matiere: ''
      });
    }
  }

  onSubmitSaveForm() {
    const data = this.saveForm.value;
    const d = data.datetimeDebut;
    const f = data.datetimeFin;
    const deb = new Date(d);
    const fin = new Date(f);
    if (deb > fin) {
        this.notifier.notify('error', 'Datetime début doit inferieur à Date fin');
    } else {
      const date = this.dateForm.value;
      const d_ = date.debut;
      const f_ = date.fin;
      const deb_ = new Date(d_);
      const fin_ = new Date(f_);
      const tzoff = (new Date()).getTimezoneOffset() * 60000;
      const iso_deb = (new Date(deb_.getTime() - tzoff)).toISOString();
      const iso_fin = (new Date(fin_.getTime() - tzoff)).toISOString();
      data.datetimeDebut = (new Date(deb.getTime() - tzoff)).toISOString();;
      data.datetimeFin = (new Date(fin.getTime() - tzoff)).toISOString();;
      this.service.savePointages(this.niveauParcoursSelected.niveau.niveauId, this.niveauParcoursSelected.parcours.parcoursId, iso_deb, iso_fin, data).subscribe((d)=> {
        if (d) {
          if (d.status == 'success') {
            const c = document.getElementById('closeSave');
            setTimeout(()=>{
              c!.click();
              this.changeNiveauParcours(this.niveauParcoursSelected.niveau.niveauId, this.niveauParcoursSelected.parcours.parcoursId);
              this.notifier.notify('success', 'Evenements bien Enregistrés');
            }, 2000);
          } else {
            this.notifier.notify(d.status, d.message);
          }
        } else {
          this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!');
        }
      })
    }
  }

  deleteAllEvents() {
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
      this.service.deleteAllEventsNPDate(this.niveauParcoursSelected.niveau.niveauId, this.niveauParcoursSelected.parcours.parcoursId, iso_deb, iso_fin).subscribe((d) => {
        if (d.status == 'success') {
          this.notifier.notify(d.status, d.message);
          const c = document.getElementById('closeDeleteAll');
          c!.click()
          this.service.allEventsDate(iso_deb, iso_fin).subscribe((data)=> {
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

  deleteEvent(id: string) {
    this.selected = id;
  }

  deleteEventData() {
    console.log(this.niveauParcoursSelected);
    this.service.deleteEvent(this.selected).subscribe((d)=>{
      if (d) {
        if(d.status == 'success') {
          this.notifier.notify('success', d.message);
          const c = document.getElementById('closeDelete');
          c!.click()
          this.changeNiveauParcours('TOUT', 'TOUT');
        } else {
          this.notifier.notify(d.status, d.message);
        }
      } else {
        this.notifier.notify('error', 'Erreur inattendue viens du serveur, Réessayez plus tard!');
      }
    });
  }
}
