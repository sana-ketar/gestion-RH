const { Builder, By, Key, until } = require('selenium-webdriver');

(async function testUI() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('file:///path/to/index.html'); // Remplacez avec le chemin local vers votre fichier HTML

        // Test d'ajout d'un employé
        await driver.findElement(By.id('ajout-nom')).sendKeys("Titi");
        await driver.findElement(By.id('ajout-poste')).sendKeys("Manager");
        await driver.findElement(By.xpath("//button[text()='Ajouter']")).click();
        const employe = await driver.findElement(By.id('liste-employes')).getText();
        console.log(employe.includes("Titi - Manager") ? "Ajout réussi" : "Échec de l'ajout");

        // Test de suppression d'un employé
        await driver.findElement(By.id('supprimer-id')).sendKeys("1");
        await driver.findElement(By.xpath("//button[text()='Supprimer']")).click();
        const updatedEmploye = await driver.findElement(By.id('liste-employes')).getText();
        console.log(!updatedEmploye.includes("1 - Toto") ? "Suppression réussie" : "Échec de la suppression");
    } finally {
        await driver.quit();
    }
})();
