package org.cours.demo;

import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class GroqAiService {

    @Autowired
    private OpenAiChatModel chatModel;

    @Autowired
    private VoitureRepo voitureRepo;

    private OpenAiChatOptions defaultOptions() {
        return OpenAiChatOptions.builder()
                .model("llama-3.3-70b-versatile")
                .temperature(0.5)
                .build();
    }

    // ── 1. RÉSUMÉ D'UNE VOITURE ──────────────────────────────────
    public String resumeVoiture(Voiture voiture) {
        String prompt = """
                Tu es un expert automobile.
                Fais un résumé commercial attractif de cette voiture :
                - Marque  : %s
                - Modèle  : %s
                - Couleur : %s
                - Année   : %d
                - Prix    : %d MAD
                Réponds en français.
                """.formatted(
                voiture.getMarque(), voiture.getModele(),
                voiture.getCouleur(), voiture.getAnnee(), voiture.getPrix()
        );
        ChatResponse response = chatModel.call(new Prompt(prompt, defaultOptions()));
        return response.getResult().getOutput().getText();
    }

    // ── 2. RECOMMANDATION ────────────────────────────────────────
    public String recommanderVoitures(int budget, String couleurPref, String usage) {
        List<Voiture> dispo = StreamSupport
                .stream(voitureRepo.findAll().spliterator(), false)
                .filter(v -> v.getPrix() <= budget)
                .collect(Collectors.toList());

        if (dispo.isEmpty()) {
            return "Aucune voiture disponible dans votre budget de " + budget + " MAD.";
        }

        StringBuilder liste = new StringBuilder();
        for (Voiture v : dispo) {
            liste.append("- ID:%d | %s %s | Couleur:%s | Année:%d | Prix:%d MAD\n"
                    .formatted(v.getId(), v.getMarque(), v.getModele(),
                            v.getCouleur(), v.getAnnee(), v.getPrix()));
        }

        String prompt = """
                Tu es un conseiller automobile.
                Voici les voitures disponibles dans le budget de %d MAD :
                %s
                Couleur préférée : %s
                Usage prévu      : %s
                Recommande les 2 ou 3 meilleures voitures en justifiant chaque choix.
                Réponds en français.
                """.formatted(budget, liste.toString(), couleurPref, usage);

        ChatResponse response = chatModel.call(new Prompt(prompt, defaultOptions()));
        return response.getResult().getOutput().getText();
    }

    // ── 3. COMPARAISON ───────────────────────────────────────────
    public String comparerVoitures(Voiture v1, Voiture v2) {
        String prompt = """
                Compare ces deux voitures et aide le client à choisir :
                Voiture A : %s %s | Couleur:%s | Année:%d | Prix:%d MAD
                Voiture B : %s %s | Couleur:%s | Année:%d | Prix:%d MAD
                Donne un comparatif clair et une recommandation finale.
                Réponds en français.
                """.formatted(
                v1.getMarque(), v1.getModele(), v1.getCouleur(), v1.getAnnee(), v1.getPrix(),
                v2.getMarque(), v2.getModele(), v2.getCouleur(), v2.getAnnee(), v2.getPrix()
        );
        ChatResponse response = chatModel.call(new Prompt(prompt, defaultOptions()));
        return response.getResult().getOutput().getText();
    }
}