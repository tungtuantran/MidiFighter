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



## Anforderungen

Nach der Anforderungsanalyse wurden folgende Haupt-Anforderungen an die Anwendung identifiziert:

1. Es sollte ein visuelles Keyboard erstellt werden, das sowohl durch Maus-Clicks als auch durch die Tatstatur gesteuert werden kann. Die Steuerung durch die Tastatur ist wichtig, da man damit schnellere Eingaben machen kann, was für einen Synthesizer sehr wichtig ist.

2. Es ist wichtig, dass der Benutzer außerdem eine Musikspur wählen könnte, die im Hintergrund, begleitend zu der erzeugten Musik, laufen kann (= Background-Beat).

3. Die erzeugte Musik muss visualisiert werden und zwar sowohl die Hintergrundsmusik als auch die, mit dem Keyboard erzeugten, Töne.

4. Die Benutzeroberfläche sollte übersichtlich und einfach sein. Wobei man den Nutzer nicht zu sehr einschränken sollte, sodass alle, von einem Synthesizer erwarteten, Funktionalitäten effektiv benutzt werden können.

## Benutzeroberfläche
Ausgehend von den formulierten Anforderungen, hat jedes Gruppenmitglied einen low fidelity Papierprototypen erstellt. Der nachfolgende Prototyp wurde als Hauptprototyp für das UI der Anwendung genommen:

![Papierprototyp](https://i.ibb.co/ky2XVZ8/paper-Prototype.jpg)

Die auf der Abbildung zu sehende Benutzeroberfläche besteht aus vier Ebenen: Button-Pad, BackgroundBeat, Mapping-Bereich und Visualizer-Bereich.

Der **Button-Pad** ist die Haupt-Inputquelle des Synthesizers: es ist eine Klaviatur, die 12 unterschiedliche Buttons hat, die durch Maus-Click oder PC-Tastatur betätigt werden können. Die Button-Anordnung orientiert sich dabei an den Drum-Machines, deren Tasten grid-artig angeordent sind (z.B. wie [hier](https://ask.audio/articles/novation-announces-circuit-synth-drum-machine-pad-controller-gridbased-groove-box/de)).
Der **Mapping-Bereich** erlaubt es dem Benutzer bestimmte Klänge auszuwählen, sodass diese dann den einzelnen Buttons zugewiesen werden können. Im erstellten Papierprototyp war es so, dass nach dem Auswählen eines Klangs, ein UI-Element erscheint, das per Drag-and-Drop auf einen der Buttons gezogen wird: das würde zwar schön aussehen, ist jedoch langsamer als die Zuweisung per Maus-Klick/Tastatur-Eingabe und da man als Nutzer in der Lage sein sollte schnell Klänge den unterschiedlichen Buttons zuzuweisen, wurde beschlossen dadrauf zu verzichten.
Beim **BackgroundBeat-Bereich** hat man als Benutzer die Möglcihekeit einen Klang auszuwählen, der ununterbrochen im Hintergrund abgespielt wird. Die Benutzer können dabei die Lautstärke und die Geschwindigkeit des BackgroundBeats einzustellen. Im **Visualizer-Beriech** wird, sowohl der BackgrundBeat, als auch die, mithilfe des Button-Pads erzeugten, Klänge visualisiert.

Da während der Entwicklung neue Ideen für weitere Werkzeuge dazukamen (Zum Beispiel Metronom), wurde es beschlossen das UI-Konzept zu verändern: es kam der *'Add-Tool'-Button* hinzu, der es erlaubte weitere Werkzeuge auszuwählen, damit diese im UI der Anwendung angezeigt werden können. Wenn man ein Werkzeug nicht brauchen sollte, dann können die Nutzer anhand des '-'-Buttons, der auf jedem Werkzeug platziert ist, das Werkzeug schließen. Diese Änderung des UI-Konzeptes war notwendig, um die geforderte Übersichtlichkeit zu erhalten, da ansonsten die Benutzeroberfläche zu überladen wirken würde. Diese Änderung erlaubt es also dem Benutzer die Benutzeroberfläche perfekt an seinne Bedürfnisse anzupassen, was effektives Arbeiten mit der Anwendung ermöglicht.

Folgende Tools wurden implementiert:
- *Metronom*
- *RecordingTool* (Zum Aufzeichnen der Audioausgabe)
- *UploadingTool* (Zum Hochladen von neuen Audiodateien)
- *BackgrundBeat* (Es wurde beschlossen das BackgroundBeat-Tool optional zu machen)


## Ordnerstruktur

Der `src` Ordner enthält den gesamten JavaScript-Code des Projekts. Im `src` Ordner sind zwei weitere Ordner enthalten: `components` (enthält die React-Component-Klassen) und `audio` (enthält Klassen, die für Audio-Wiedergabe zuständig sind).

In `public/backgroundbeatAudio` sind Audiodateien enthalten, die für die Background-Beat-Funktionalität genutzt werden.
In `public/padSoundAudio` sind Audiodateien enthalten, die vom Button-Pad zum Abspielen einzelner Klänge benutzt werden.

## Anwendungsarchitektur

![UML-Klassendiagramm der Anwendung](https://i.ibb.co/QKwbWxX/uml-Audio-Video.png)

Für die Entwicklung des Front-Ends wurde React ausgewählt. React ist eine JavaScript-Library, die es erlaubt schnell und einfach Front-End für Webseiten zu erstellen. Die Grundlage des Projekts wurde `create-react-app` erzeugt. Mit create-react-app kann eine vorkonfigurierte Entiwcklungsumgebnung mit allen benötigten Libraries und einem Webserver erzeugt werden. Für CSS wurde des Weiteren `bootstrap` eingesetzt, eine CSS-Library, die es erlaubt schnell ästhetisch ansprechende Webseiten-Elemente zu erzeugen. Zur Wiedergabe von Audio wurde die Web Audio API benutzt. Es wurden außerdem Animationen benutzt(Zum Beispiel Fade-In beim erstellen eines neuen Tools), die mithilfe von `react-spring` umgesetzt wurden.

React erlaubt es Webseiten komponentenbasiert zu Entwickeln. Jedes UI Element der Webseite kann als eine getrennte Komponente repräsentiert werden, wobei die einzelnen Komponenten aus anderen Komponenten zusammengesetzt werden können. React stellt dafür die Klasse `Component` zur Verfügung, von der alle erstllten Komponenten erben müssen. Im oben abbgebildeten Klassendiagramm des Projekts sieht man den generellen Aufabau der Anwendung (Die mit grau gekennzeichneten Klassen sind keine React-Komponenten). Statt Component wurde jedoch fast ausschließlich `PureComponent`, da es bei dieser Klasse die `render()`-Methode nur aufgerufen wird, wenn sich etwas am Zustand der Komponente sich geändert hat, was gut für die Performance ist. Bei der normalen Component Klasse wird die `render()`-Methode jedes mal aufgerufen, wenn sich etwas am Zustand der Eltern-Komponente sich ändert.

Wie man in der Abbildung sehen kann, enthält die Komponente *Application* alle UI-Komponenten der Anwendung. Folgende Komponenten sind in *Application* fest verbaut: *Visualizer, ButtonPad, MapSound*. Folgende Komponenden können mit dem 'AddTool'-Button hinzugefügt werden: *BackgroundBeat, Metronom, RecordingTool, UploadingTool*. Die ButtonPad Komponente enthält MusicButton-Komponenten, die die Buttons des Synthesizers darstellen und benutzt außerdem die Klasse PadSound zum Abspielen von Klängen. Die BackgroundBeat-Komponente benutzt die Klasse BackgroundBeatPlayer zur Wiedergabe des Hintergrund-Beats. Die meisten wichtigen Informationen (wie zum Beispiel die Liste mit allen abspielbaren Klängen) werden zentral in der Klasse Application verwaltet und bei bedarf an die verbundenen Komponenten weitergereicht.



