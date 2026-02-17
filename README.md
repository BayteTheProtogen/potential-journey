# CyberStrażnik - Edukacja Cyberbezpieczeństwa dla Seniorów

**CyberStrażnik** to innowacyjna aplikacja mobilna (iOS/Android) inspirowana mechaniką Duolingo, zaprojektowana specjalnie dla osób starszych. Naszą misją jest uzbrojenie seniorów w wiedzę niezbędną do bezpiecznego poruszania się w cyfrowym świecie.

## 🌟 Kluczowe Funkcje (Investor-Ready)

1.  **Dostępność (Accessibility First):**
    *   Wybór wielkości czcionki (Normalna, Duża, Bardzo Duża).
    *   Tryb wysokiego kontrastu dla osób niedowidzących.
    *   Duże, czytelne elementy interfejsu i haptyka (wibracje) jako informacja zwrotna.
2.  **Grywalizacja (Gamification):**
    *   **Sygnałek:** Interaktywna maskotka d(-_-)b, która reaguje na postępy użytkownika.
    *   **System XP i Streaków:** Motywacja do codziennej nauki.
    *   **Mapa Nauki:** Wizualna ścieżka postępu przez "Cyber-Miasto".
3.  **Realistyczne Scenariusze (Cyber-Symulacje):**
    *   Analiza podejrzanych SMS-ów i e-maili.
    *   Ochrona przed oszustwem "na wnuczka" (Vishing).
    *   Nauka tworzenia bezpiecznych haseł i bezpiecznych płatności online.
4.  **Prywatność:**
    *   Aplikacja działa w 100% lokalnie. Brak konieczności zakładania konta i przesyłania danych do chmury na etapie prototypu.

## 🛠 Technologia

*   **Framework:** React Native (Expo)
*   **Język:** TypeScript
*   **Animacje:** React Native Reanimated (płynne reakcje maskotki i aury binarnej)
*   **Nawigacja:** Expo Router (File-based routing)
*   **Przechowywanie danych:** AsyncStorage (lokalna baza postępów)

## 🚀 Instrukcja Uruchomienia

### Wymagania
*   Node.js
*   Xcode (dla iOS) lub Android Studio (dla Androida)

### Szybki Start
1.  Zainstaluj zależności:
    ```bash
    npm install
    ```
2.  Uruchom w środowisku Expo:
    ```bash
    npx expo start
    ```

### Kompilacja Natywna (App Store / Play Store)
Aplikacja posiada już wygenerowane foldery natywne:
*   **Android:** Otwórz folder `android` w **Android Studio**. Możesz stąd od razu zbudować plik `.apk` lub `.aab`.
*   **iOS:** Otwórz folder `ios/CyberStraznik.xcworkspace` w **Xcode**. Możesz stąd uruchomić aplikację na symulatorze lub fizycznym iPhone.

## 📈 Wizja Rozwoju
*   Moduł AI generujący dynamiczne przykłady phishingowe.
*   Tryb "Wspólna Nauka" dla wnuczka i dziadka.
*   Certyfikat "Strażnika Sieci" po ukończeniu wszystkich modułów.

---
Projekt przygotowany jako pełnowartościowy prototyp inwestorski.
