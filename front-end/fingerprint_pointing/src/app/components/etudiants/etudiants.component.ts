import { Component, OnInit } from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';
import { AnneeUnivService } from '../../services/annee-univ.service';
import { ParcoursService } from '../../services/parcours.service';
import { NiveauService } from '../../services/niveau.service';
import { EtudiantService } from '../../services/etudiant.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({backgroundColor: 'black', opacity: 0}),
        animate(2000, style({backgroundColor: 'white', opacity: 1}))
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

  constructor(
    private service: EtudiantService,
    private anneeService: AnneeUnivService,
    private parcoursService: ParcoursService,
    private niveauService: NiveauService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
    this.getAllAnneeUnivs();
    this.getAllNiveaux();
    this.getAllParcours();
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
            this.getAllEtudiants(this.annees[i].anneeUnivId);
          }, 2000);
        }
      }
    })
  }

  /** GET ALL PARCOURS */
  getAllParcours() {
    this.parcoursService.allParcours().subscribe((data) => {
      this.parcours = data;
    });
  }

  /** GET ALL NIVEAUX */
  getAllNiveaux() {
    this.niveauService.allNiveaus().subscribe((data) => {
      this.niveaux = data;
    });
  }

  /** GET ALL ETUDIANTS */
  getAllEtudiants(id_annee: string) {
    this.service.allEtudiantsAnneeUniv(id_annee).subscribe((data) => {
      this.etudiants = data;
      for(let i = 0; i < this.etudiants.length; i++) {
        this.niveauService.getOneNiveau(this.etudiants[i].niveau).subscribe((data) => {
          this.etudiants[i].niveauCode = data.niveauCode;
        });
        this.parcoursService.getOneParcours(this.etudiants[i].parcours).subscribe((data) => {
          this.etudiants[i].parcoursCode = data.parcoursCode;
        });
      }
    })
  }

  /** GET ALL ETUDIANTS (PARCOURS) */
  getAllEtudiantsP(id_annee: string, id_parcours: string) {
    this.service.allEtudiantsAnneeUnivParcours(id_annee, id_parcours).subscribe((data) => {
      this.etudiants = data;
      for(let i = 0; i < this.etudiants.length; i++) {
        this.niveauService.getOneNiveau(this.etudiants[i].niveau).subscribe((data) => {
          this.etudiants[i].niveauCode = data.niveauCode;
        });
        this.parcoursService.getOneParcours(this.etudiants[i].parcours).subscribe((data) => {
          this.etudiants[i].parcoursCode = data.parcoursCode;
        });
      }
    })
  }

  /** GET ALL ETUDIANTS (NIVEAU) */
  getAllEtudiantsN(id_annee: string, id_niveau: string) {
    this.service.allEtudiantsAnneeUnivNiveau(id_annee, id_niveau).subscribe((data) => {
      this.etudiants = data;
      for(let i = 0; i < this.etudiants.length; i++) {
        this.niveauService.getOneNiveau(this.etudiants[i].niveau).subscribe((data) => {
          this.etudiants[i].niveauCode = data.niveauCode;
        });
        this.parcoursService.getOneParcours(this.etudiants[i].parcours).subscribe((data) => {
          this.etudiants[i].parcoursCode = data.parcoursCode;
        });
      }
    })
  }

  /** GET ALL ETUDIANTS (PARCOURS/NIVEAUX) */
  getAllEtudiantsNP(id_annee: string, id_niveau: string, id_parcours: string) {
    this.service.allEtudiantsAnneeUnivNiveauParcours(id_annee, id_niveau, id_parcours).subscribe((data) => {
      this.etudiants = data;
      for(let i = 0; i < this.etudiants.length; i++) {
        this.niveauService.getOneNiveau(this.etudiants[i].niveau).subscribe((data) => {
          this.etudiants[i].niveauCode = data.niveauCode;
        });
        this.parcoursService.getOneParcours(this.etudiants[i].parcours).subscribe((data) => {
          this.etudiants[i].parcoursCode = data.parcoursCode;
        });
      }
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
      }, 2000);
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
        }, 2000);
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
      }, 2000);
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
        }, 2000);
      });
    }
  }

}
