package org.cours.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface VoitureRepo extends CrudRepository<Voiture, Long> {

    // Recherche par modele
    List<Voiture> findByModele(@Param("modele") String modele);

    // Recherche par couleur
    List<Voiture> findByCouleur(@Param("couleur") String couleur);

}