export class Cicle {
    constructor(nom, categoria, numAlumnes, abreviatura) {
        this.nom = nom;
        this.categoria = categoria;
        this.numAlumnes = numAlumnes;
        this.abreviatura = abreviatura;
        this.dataCreacio = new Date();
        this.numEdicions = 0;
        this.moduls = [];
    }

    setNumEdicions() {
        this.numEdicions++;
        
    }

    setDataCreacio() {
        this.dataCreacio = new Date();
    }

    toString() {

        this.moduls.sort();

        let text = `Nom del cicle: ${this.nom} 
                    Categoria: ${this.categoria} 
                    Número d'alumnes: ${this.numAlumnes}
                    Abreviatura del cicle: ${this.abreviatura}
                    Data de creació: ${this.dataCreacio}
                    Numero d'edicions ${this.numEdicions}
                    Moduls:
                    `;
        this.moduls.forEach((modul) => {
            text += `  - Nom del mòdul: ${modul.nom}
                      Número del mòdul: ${modul.num}
                      Hores del mòdul: ${modul.hores}
                    `;
        });

        return text;
    }
}