package org.cours.demo;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class VoitureRepoTest {

    @Autowired
    VoitureRepo voitureRepo;

    @Test
    public void ajouterVoiture() {
        Voiture voiture = new Voiture("MiolaCar", "Uber", "Blanche", "M-2020", 2021, 180000);
        voitureRepo.save(voiture);
        assertThat(voiture.getId()).isNotNull();
    }

    @Test
    public void supprimerVoiture() {
        voitureRepo.save(new Voiture("MiolaCar", "Uber", "Blanche", "M-2020", 2021, 180000));
        voitureRepo.save(new Voiture("MiniCooper", "Uber", "Rouge", "C-2020", 2021, 180000));
        voitureRepo.deleteAll();
        assertThat(voitureRepo.findAll()).isEmpty();
    }
}