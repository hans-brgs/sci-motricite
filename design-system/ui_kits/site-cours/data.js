const COURSES=[
{id:"biomeca",code:"DEUST APSL",title:"Biomécanique & analyse du mouvement du sénior",level:"DEUST 1",hours:"9 chapitres · 24 h CM",tags:["cinématique","cinétique","marche"],accent:"teal",desc:"Décrire et expliquer le mouvement du sénior : marche, posture, équilibre, prévention des chutes.",progress:9},
{id:"cinetique",code:"DEUST APSL",title:"Cinétique : expliquer le mouvement",level:"DEUST 1",hours:"7 chapitres · 18 h CM",tags:["forces","Newton","moments"],accent:"violet",desc:"Remonter des effets aux causes : forces musculaires, réaction au sol, moments articulaires.",progress:7},
{id:"physio",code:"L1 STAPS",title:"Physiologie de l'exercice",level:"L1",hours:"6 chapitres · 24 h CM",tags:["VO2max","filières"],accent:"teal",desc:"Réponses aiguës et adaptations chroniques de l'organisme à l'effort.",progress:4},
{id:"methodo",code:"M1 EOPS",title:"Méthodologie de la mesure",level:"M1",hours:"5 chapitres · 12 h CM",tags:["plateforme de force","R"],accent:"violet",desc:"Instrumenter, mesurer et interpréter des données de motricité.",progress:2}];

const SOMMAIRE=[
{label:"Chapitre 1 · Cinématique",items:[
 {id:"s11",label:"1.1 Qu'est-ce que la biomécanique ?"},
 {id:"s12",label:"1.2 Pourquoi mesurer ?"},
 {id:"s13",label:"1.3 Cinématique ou cinétique"},
 {id:"s14",label:"1.4 Les deux natures du mouvement"},
 {id:"s15",label:"1.5 Décrire un déplacement"},
 {id:"s16",label:"1.6 La vitesse"},
 {id:"s17",label:"1.7 L'accélération"},
 {id:"s18",label:"1.8 La cinématique angulaire"},
 {id:"s19",label:"1.9 Synthèse et ouverture"}]},
{label:"Chapitre 2 · Cinétique",items:[
 {id:"s21",label:"2.1 Qu'est-ce qu'une force ?"},
 {id:"s22",label:"2.2 Les lois de Newton"},
 {id:"s23",label:"2.3 La force de réaction au sol"}]},
{label:"Travaux dirigés",items:[
 {id:"td1",label:"TD 1 — Objectiver une marche"},
 {id:"td2",label:"TD 2 — Analyse vidéo"}]}];

const GLOSSAIRE=[
{term:"Biomécanique",lang:"Hatze, 1974",def:"Étude de la structure et de la fonction des systèmes biologiques par les méthodes de la mécanique. En clair : l'étude des forces et de leurs effets sur le vivant."},
{term:"Objectiver",lang:"",def:"Transformer une impression en mesure : une grandeur définie, exprimée dans une unité."},
{term:"Cinématique",lang:"en. kinematics",def:"Étude des valeurs descriptives du mouvement : positions, vitesses, accélérations, angles. L'effet."},
{term:"Cinétique",lang:"en. kinetics",def:"Étude des forces qui s'appliquent au mouvement. La cause."},
{term:"Données normatives",lang:"",def:"Valeurs habituellement mesurées dans un groupe de référence (même âge, même sexe)."},
{term:"Mécanobiologie",lang:"",def:"Étude de la façon dont les cellules perçoivent les forces mécaniques et y répondent."},
{term:"Paramètre biomécanique",lang:"",def:"Grandeur mesurable décrivant le mouvement ou les forces : vitesse de marche (m/s), longueur de pas (cm), angle articulaire (°)."}];

const REFS=[
{year:"1974",authors:"Hatze H.",title:"Letter: The meaning of the term biomechanics",source:"Journal of Biomechanics"},
{year:"2009",authors:"Winter D. A.",title:"Biomechanics and Motor Control of Human Movement",source:"Wiley"},
{year:"2015",authors:"Enoka R. M.",title:"Neuromechanics of Human Movement",source:"Human Kinetics"},
{year:"1680",authors:"Borelli G. A.",title:"De Motu Animalium",source:"Rome"}];

Object.assign(window,{COURSES,SOMMAIRE,GLOSSAIRE,REFS});