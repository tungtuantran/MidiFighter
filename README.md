# Dokumentation

## Installation

1. `git clone https://github.com/tungtuantran/MidiFighter.git`

2. `cd MidiFighter`

3. `npm install`  -> um alle benötigten Abhängigkeiten zu instalieren

Hinweis: .gitignore enthält den Ordner node_modules

## Benutzung

Zum starten des Servers `npm start` ausführen.



## Allgemeines

Die vorliegende Anwendung wurde im Rahmen des Moduls "Audio- und Videotechnik", and der HTW-Berlin entwickelt. Die implementierte Anwendung ist ein Synthesizer, der es dem Benutzer erlaubt Musik mithilfe von eines Synthesizer-Keyboards und dem auswählbaren Hintergrund-Beat, zu erzeugen. Die Mitglieder des Teams sind:

- **Cong Minh Nguyen, 564030**
- **Tung Tuan Tran, 564070**
- **Andrey Borisov, 563858**



## Benutzeroberfläche

Nach der Anforderungsanalyse wurden folgende Haupt-Anforderungen an die Anwendung identifiziert:

1. Es sollte ein visuelles Keyboard erstellt werden, das sowohl durch Maus-Clicks als auch durch die Tatstatur gesteuert werden kann. Die Steuerung durch die Tastatur ist wichtig, da man damit schnellere Eingaben machen kann, was für einen Synthesizer sehr wichtig ist.

2. Es ist wichtig, dass der Benutzer außerdem eine Musikspur wählen könnte, die im Hintergrund, begleitend zu der erzeugten Musik, laufen kann (= Background-Beat).

3. Die erzeugte Musik muss visualisiert werden und zwar sowohl die Hintergrundsmusik als auch die, mit dem Keyboard erzeugten, Töne.

Ausgehend von den formulierten Anforderungen, hat jedes Gruppenmitglied einen low fidelity Papierprototypen erstellt. Der nachfolgende Prototyp wurde als Hauptprototyp für das UI der Anwendung genommen:

![Papierprototyp](https://i.ibb.co/ky2XVZ8/paper-Prototype.jpg)

Die auf der Abbildung zu sehende Benutzeroberfläche besteht aus vier Ebenen: Button-Pad, BackgroundBeat, Mapping-Bereich und Visualizer-Bereich.

Der Button-Pad ist die Haupt-Inputquelle des Synthesizers: es ist eine Klaviatur, die 12 unterschiedliche Buttons hat, die durch Maus-Click oder PC-Tastatur betätigt werden können. Die Button-Anordnung orientiert sich dabei an den Drum-Machines, deren Tasten grid-artig angeordent sind (z.B. wie [hier](https://ask.audio/articles/novation-announces-circuit-synth-drum-machine-pad-controller-gridbased-groove-box/de)).
Der Mapping-Bereich erlaubt es dem Benutzer bestimmte Klänge auszuwählen, sodass diese dann den einzelnen Buttons zugewiesen werden können. Im erstellten Papierprototyp war es so, dass nach dem Auswählen eines Klangs, ein UI-Element erscheint, das per Drag-and-Drop auf einen der Buttons gezogen wird: das würde zwar schön aussehen, ist jedoch langsamer als die Zuweisung per Maus-Klick/Tastatur-Eingabe und da man als Nutzer in der Lage sein sollte schnell Klänge den unterschiedlichen Buttons zuzuweisen, wurde beschlossen dadrauf zu verzichten.
Beim BackgroundBeat-Bereich hat man als Benutzer die Möglcihekeit einen Klang auszuwählen, der ununterbrochen im Hintergrund abgespielt wird. Die Benutzer können dabei die Lautstärke und die Geschwindigkeit des BackgroundBeats einzustellen. Im Visualizer-Beriech wird, sowohl der BackgrundBeat, als auch die, mithilfe des Button-Pads erzeugten, Klänge visualisiert.


## Ordnerstruktur

Der `src` Ordner enthält den gesamten JavaScript-Code des Projekts. Im `src` Ordner sind zwei weitere Ordner enthalten: `components` (enthält die React-Component-Klassen) und `audio` (enthält Klassen, die für Audio-Wiedergabe zuständig sind).

In `public/backgroundbeatAudio` sind Audiodateien enthalten, die für die Background-Beat-Funktionalität genutzt werden.

## Anwendungsarchitektur

![UML-Klassendiagramm der Anwendung](https://i.ibb.co/b7NRLLv/uml-Midi-Fighter.png)
- mit react entwickelt
- anwendung aus componenten-klassen zusammengesetzt
- web audio api
