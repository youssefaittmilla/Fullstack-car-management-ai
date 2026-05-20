package org.cours.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ai")
@CrossOrigin(origins = "http://localhost:3000")
public class VoitureAiController {

    @Autowired
    private GroqAiService groqAiService;

    @Autowired
    private VoitureRepo voitureRepo;

    // GET /ai/voitures/{id}/resume
    @GetMapping("/voitures/{id}/resume")
    public String resumeVoiture(@PathVariable Long id) {
        Voiture voiture = voitureRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Voiture introuvable : " + id));
        return groqAiService.resumeVoiture(voiture);
    }

    // GET /ai/voitures/recommander?budget=100000&couleur=Rouge&usage=ville
    @GetMapping("/voitures/recommander")
    public String recommander(
            @RequestParam int budget,
            @RequestParam(defaultValue = "peu importe") String couleur,
            @RequestParam(defaultValue = "usage général") String usage) {
        return groqAiService.recommanderVoitures(budget, couleur, usage);
    }

    // GET /ai/voitures/comparer?id1=1&id2=2
    @GetMapping("/voitures/comparer")
    public String comparer(@RequestParam Long id1, @RequestParam Long id2) {
        Voiture v1 = voitureRepo.findById(id1)
                .orElseThrow(() -> new RuntimeException("Voiture introuvable : " + id1));
        Voiture v2 = voitureRepo.findById(id2)
                .orElseThrow(() -> new RuntimeException("Voiture introuvable : " + id2));
        return groqAiService.comparerVoitures(v1, v2);
    }
}