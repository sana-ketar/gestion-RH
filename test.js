const { ajouterEmploye, supprimerEmploye } = require('./app');

describe('Tests unitaires pour les employés', () => {
    let employes;

    beforeEach(() => {
        employes = [
            { id: 1, nom: 'Toto', poste: 'Développeur' },
            { id: 2, nom: 'Tata', poste: 'Développeuse' },
        ];
    });

    test('ajouterEmploye correctement', () => {
        ajouterEmploye(employes, 3, 'Martin', 'Chef de Projet');
        expect(employes).toHaveLength(3); 
        expect(employes[2]).toEqual({ id: 3, nom: 'Martin', poste: 'Chef de Projet' });
    });

    test('ajouterEmploye ne permet pas d\'ajouter un employé avec un id existant', () => {
        ajouterEmploye(employes, 1, 'Titi', 'Manager');
        expect(employes).toHaveLength(2);
        expect(employes.find(e => e.id === 1).poste).toBe('Développeur'); 
    });

    test('supprimerEmploye correctement un employé qui existe', () => {
        supprimerEmploye(employes, 1);
        expect(employes).toHaveLength(1); 
        expect(employes[0].id).toBe(2); 
    });

    test('supprimerEmploye ne fait rien si l\'id n\'existe pas', () => {
        supprimerEmploye(employes, 99);
        expect(employes).toHaveLength(2); 
        expect(employes).toContainEqual({ id: 1, nom: 'Toto', poste: 'Développeur' }); 
        expect(employes).toContainEqual({ id: 2, nom: 'Tata', poste: 'Développeuse' });
    });

    test('supprimerEmploye ne supprime pas avec un id invalide', () => {
        supprimerEmploye(employes, null);
        expect(employes).toHaveLength(2); // La longueur reste la même.
    });
});
