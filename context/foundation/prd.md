---
project: "white-apron"
version: 1
status: draft
created: 2026-09-15
context_type: greenfield
product_type: web-app
target_scale:
  users: small
  qps: low
  data_volume: small
timeline_budget:
  mvp_weeks: 3
  hard_deadline: 2026-11-04
  after_hours_only: true
---

## Vision & Problem Statement

Osoba pasjonująca się gotowaniem od dziecka, marząca o starcie w MasterChefie, nie ma dziś systematycznego sposobu na śledzenie własnego postępu kulinarnego — ile i jakich kuchni świata faktycznie spróbowała, ile różnych składników i przypraw poznała, i co jeszcze zostało do odkrycia. Bez tego trudno ocenić realny postęp i łatwo stracić motywację w wieloletniej drodze do mistrzostwa.

Istniejące narzędzia kulinarne (listy przepisów, ulubione) liczą "ile przepisów zapisano", a nie "jak szeroką mapę kuchni i składników faktycznie opanowano". White-apron mierzy postęp przez różnorodność i szerokość doświadczenia kulinarnego, wizualizowaną jako namacalna, rosnąca ranga (gradient koloru fartucha od czarnego do białego) — a nie przez liczbę zapisanych przepisów.

## User & Persona

**Aspirujący domowy szef kuchni (Ty)** — osoba z pasją do gotowania sięgającą dzieciństwa, dążąca do poziomu umiejętności wystarczającego do startu w MasterChefie. Sięga po aplikację za każdym razem, gdy ugotuje nową potrawę (żeby zapisać postęp) oraz gdy zastanawia się, co ugotować dalej (żeby zobaczyć, jakich kuchni/składników jeszcze nie próbowała).

## Success Criteria

### Primary
- Użytkownik może zalogować się, dodać ugotowaną potrawę (nazwa, kuchnia, użyte składniki/przyprawy) i zobaczyć naliczone XP oraz zaktualizowany gradient koloru fartucha (czarny → biały).

### Secondary
- Użytkownik widzi postęp według kuchni (ile z znaczących kuchni świata już wypróbowano) oraz listę użytych składników/przypraw (co już poznano, a czego jeszcze nie użyto).

### Guardrails
- Dane o ugotowanych potrawach nigdy się nie gubią — trwały zapis postępu.
- Naliczanie XP i aktualizacja gradientu są spójne — bez duplikatów, bez cofania postępu.
- Dostęp do konta jest prywatny — tylko właściciel widzi i edytuje swój postęp.

## User Stories

### US-01: Użytkownik dodaje ugotowaną potrawę i zdobywa XP

- **Given** zalogowany użytkownik na ekranie dodawania potrawy
- **When** wpisze nazwę potrawy, wybierze kuchnię i wskaże użyte składniki/przyprawy, a następnie zapisze wpis
- **Then** potrawa zostaje zapisana, użytkownik otrzymuje naliczone XP, a gradient koloru fartucha aktualizuje się zgodnie z nowym poziomem XP

#### Acceptance Criteria
- Zapisana potrawa jest trwale przypisana do konta użytkownika
- XP jest naliczane dokładnie raz na potrawę (brak duplikatów przy ponownym zapisie tego samego wpisu)
- Gradient fartucha odzwierciedla łączny zdobyty XP, nie tylko ostatnią potrawę

## Functional Requirements

### Rdzeń (potrawy, XP, gradient)
- FR-001: Zalogowany użytkownik może dodać ugotowaną potrawę (nazwa, kuchnia, składniki/przyprawy — wszystkie pola wymagane). Priority: must-have
  > Socrates: Kontrargument rozważony: "wymóg wpisania pełnej listy składników/przypraw przy każdej potrawie to zbyt duże tarcie i zniechęci do regularnego korzystania." Rozstrzygnięcie: pole zostaje wymagane — pełne dane od razu są potrzebne, żeby FR-004/005 (postęp wg kuchni/składników) miały sens od pierwszego wpisu.
- FR-002: System nalicza użytkownikowi XP za każdą dodaną potrawę, ale tylko za unikalne kombinacje potrawa+kuchnia — powtórne dodanie tej samej potrawy w tej samej kuchni nie nalicza kolejnego XP. Priority: must-have
  > Socrates: Kontrargument rozważony: "płaskie XP za każdą potrawę pozwala farmić punkty, powtarzając tę samą prostą potrawę." Rozstrzygnięcie: XP ograniczone do unikalnych kombinacji potrawa+kuchnia, co wymusza różnorodność zamiast ilości.
- FR-003: System aktualizuje wizualny gradient koloru fartucha (czarny → biały) na podstawie zdobytego XP, wyświetlany razem z liczbą XP i etykietą poziomu. Priority: must-have
  > Socrates: Kontrargument rozważony: "sam kolor fartucha bez liczby nic nie mówi o realnym postępie." Rozstrzygnięcie: gradient zawsze towarzyszy liczbie XP i opisowej etykiecie poziomu.

### Postęp i widoczność
- FR-004: Użytkownik widzi postęp według kuratorowanej, edytowalnej listy znaczących kuchni świata — dla każdej kuchni widzi liczbę różnych ugotowanych potraw, nie tylko binarny stan wypróbowano/nie. Priority: must-have
  > Socrates: Kontrargumenty rozważone: (1) "nie istnieje ustalona lista znaczących kuchni świata — spór o kompletność", (2) "bez progu jakości, jedna banalna potrawa odhacza całą kuchnię." Rozstrzygnięcie: startowa kuratorowana lista kuchni (edytowalna) + licznik liczby potraw na kuchnię zamiast checkboxa tak/nie — oba problemy adresowane naraz.
- FR-005: Użytkownik widzi listę użytych i nieużytych składników/przypraw; składniki/przyprawy wybiera z podpowiadanej, rosnącej listy z autouzupełnianiem (nie z wolnego tekstu), żeby liczenie unikalnych pozycji było spójne. Priority: must-have
  > Socrates: Kontrargument rozważony: "wolny tekst prowadzi do niespójnego liczenia (np. 'pomidor' vs 'pomidory' liczone osobno)." Rozstrzygnięcie: pole z autouzupełnianiem/tagami ze wspólnej, rosnącej listy zamiast wolnego tekstu.

### Konto
- FR-006: Użytkownik może się zalogować i wylogować. Priority: must-have
  > Socrates: Kontrargument rozważony: "pełny system kont to nadmiarowa złożoność dla apki jednoosobowej — lokalny profil by wystarczył." Rozstrzygnięcie: FR-006 stoi bez zmian — login pozostaje, ponieważ decyzja o modelu dostępu uwzględniała też wymóg mechanizmu kontroli dostępu, nie tylko wygodę dla jednego użytkownika.

### Motywacja i odkrywanie (rozszerzenia)
- FR-007: Użytkownik zdobywa osiągnięcia za progi liczby ugotowanych potraw w danej kuchni (te same liczniki co FR-004, np. 3/10/20 potraw = kolejne odznaki). Priority: nice-to-have
  > Socrates: Kontrargument rozważony: "bez jasnego progu opanowania osiągnięcia będą arbitralne." Rozstrzygnięcie: progi osiągnięć oparte wprost na liczniku potraw z FR-004, bez nowej, osobnej metryki.
- FR-008: Użytkownik może ręcznie oznaczyć 1-2 ulubione kuchnie jako "specjalizację" (odznaka wyboru, nie kolejny licznik postępu). Priority: nice-to-have
  > Socrates: Kontrargument rozważony: "specjalizacje dublują FR-004 (licznik postępu wg kuchni)." Rozstrzygnięcie: specjalizacja to ręczny wybór/odznaka ulubionej kuchni, wyraźnie odrębna od automatycznego licznika postępu w FR-004.
- FR-009: System sugeruje nowe potrawy do wypróbowania (wsparcie AI). Priority: nice-to-have
  > Socrates: Kontrargument rozważony: "zależność od zewnętrznego serwisu (web search/API) to ryzyko blokujące." Rozstrzygnięcie: FR-009 zostaje jako rozszerzenie po MVP; konkretny mechanizm pozostaje otwartym pytaniem i nie blokuje rdzenia produktu.

## Non-Functional Requirements

- Użytkownik widzi potwierdzenie zapisu potrawy oraz zaktualizowany XP/gradient w czasie odczuwanym jako natychmiastowy (< 1s p95).
- Produkt pozostaje użyteczny na najnowszych wersjach głównych przeglądarek desktop i mobile, bez wymogu dedykowanej aplikacji natywnej.

## Business Logic

System przelicza różnorodność ugotowanych potraw (unikalne kombinacje potrawa+kuchnia) na punkty doświadczenia, poziom (kolor) fartucha i odznaki mistrzostwa kuchni.

Wejściami reguły są dane podawane przy każdym zapisie: nazwa potrawy, kuchnia oraz użyte składniki/przyprawy. Wyjściem są trzy powiązane wskaźniki: punkty doświadczenia, poziom/kolor fartucha (gradient czarny → biały) oraz odznaki mistrzostwa danej kuchni. Użytkownik spotyka tę regułę zaraz po zapisaniu potrawy — widzi natychmiast zaktualizowany pasek XP i gradient fartucha, a po przekroczeniu progu liczby różnych potraw w danej kuchni odblokowuje się odznaka.

## Access Control

Logowanie (email + hasło / OAuth / passwordless) — pełny ekran logowania. Płaski model kont: jeden typ konta, każdy zalogowany użytkownik widzi i zarządza wyłącznie własnym postępem (potrawy, XP, gradient fartucha, osiągnięcia). Brak ról administracyjnych ani współdzielenia danych w MVP.

## Non-Goals

- **Bez elementów społecznościowych** (rankingi, porównania z innymi użytkownikami) — MVP jest wyłącznie osobistym trackerem, nie platformą społecznościową; przy większej skali to naturalne rozszerzenie, ale poza obecną regułą domenową.
- **Bez własnego silnika rekomendacji potraw** — sugestie AI (FR-009) opierają się na gotowym mechanizmie, nie na budowanym od zera algorytmie rekomendacji.

## Open Questions

1. **Jaki dokładnie ma być mechanizm AI-sugestii nowych potraw (FR-009)?** — ogólny web search przez asystenta AI, czy integracja z zewnętrznym API/bazą przepisów? Owner: użytkownik. By: przed implementacją FR-009 (rozszerzenie po MVP), nie blokuje startu.
