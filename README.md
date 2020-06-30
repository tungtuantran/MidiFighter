

# MidiFighter
<center>
<img src="https://heartbleed.de/ressources/midiFighterLogo.png" alt="logo" width="200"/>
</center>

Die vorliegende Anwendung wurde im Rahmen des Moduls "Audio- und Videotechnik" an der HTW-Berlin entwickelt. Die implementierte Anwendung ist eine Drum Machine, die es dem Benutzer erlaubt Musik mithilfe von Drum-Machine-Keyboards und dem auswählbaren Hintergrund-Beat zu erzeugen. Die Mitglieder des Teams sind:

- **Cong Minh Nguyen, 564030**
- **Tung Tuan Tran, 564070**
- **Andrey Borisov, 563858**
    

## Installation

1. `git clone https://github.com/tungtuantran/MidiFighter.git`

2. `cd MidiFighter`

3. `npm install`  -> um alle benötigten Abhängigkeiten zu installieren

Hinweis: .gitignore enthält den Ordner node_modules

**Die Anwendung funktioniert in den folgenden Browsern: Opera, Firefox, Chrome. In den folgenden Browsern funktioniert sie nicht: Safari**

## Benutzung

Zum starten des Servers `npm start` ausführen.


## Ordnerstruktur

Der `src` Ordner enthält den gesamten JavaScript-Code des Projekts. Im `src` Ordner sind zwei weitere Ordner enthalten: `components` (enthält die React-Component-Klassen) und `audio` (enthält Klassen, die für Audio-Wiedergabe zuständig sind).

In `public/backgroundbeatAudio` sind Audiodateien enthalten, die für die Background-Beat-Funktionalität benutzt werden.
In `public/padSoundAudio` sind Audiodateien enthalten, die vom Button-Pad zum Abspielen einzelner Klänge benutzt werden.



## Anforderungen

Nach der Anforderungsanalyse wurden folgende Hauptanforderungen für die die Anwendung festgelegt:

1. Da dies eine Anwendung ist, mit der man Musik produzieren kann, müssen alle Interkationen schnell sein, um zum Beispiel im richtigen Rhythmus zu bleiben.

2. Es sollte ein visuelles Keyboard erstellt werden, das sowohl durch Maus-Clicks als auch durch die Tatstatur gesteuert werden kann. Die Steuerung durch die Tastatur ist wichtig, da man damit schnellere Eingaben machen kann, was für eine Drum Machine sehr wichtig ist.

3. Der Benutzer soll in der Lage sein eine Audiospur zu wählen (Background-Beat) die begleitend zu der erzeugten Musik laufen kann.

4. Die erzeugte Musik muss visualisiert werden, und zwar sowohl die Hintergrundsmusik als auch die mit dem Keyboard erzeugten Töne.

5. Die Benutzeroberfläche sollte übersichtlich und simple sein. Wobei man den Nutzer nicht zu sehr einschränken sollte, sodass alle, von einer Drum Machine erwarteten, Funktionalitäten effektiv benutzt werden können.

## Benutzeroberfläche
Basierend auf den genannten Anforderungen, hat jedes Gruppenmitglied einen Low Fidelity-Prototypen erstellt. Der nachfolgende Prototyp wurde als Hauptprototyp für das UI der Anwendung verwendet:

![Papierprototyp](https://i.ibb.co/ky2XVZ8/paper-Prototype.jpg)

Die auf der Abbildung zu sehende Benutzeroberfläche besteht aus vier Ebenen: Button-Pad, BackgroundBeat, Mapping-Bereich und Visualizer-Bereich.

Das **Button-Pad** ist die Hauptinputquelle der Drum Machine: es ist eine Klaviatur, die 12 unterschiedliche Buttons hat, die durch Maus-Click oder Tastaturtasten betätigt werden können. Die Anordnung der Buttons orientiert sich dabei an den Drum-Machines, deren Tasten grid-artig angeordnet sind (z.B. wie [hier](https://ask.audio/articles/novation-announces-circuit-synth-drum-machine-pad-controller-gridbased-groove-box/de)).
Der **Mapping-Bereich** erlaubt es dem Benutzer bestimmte Klänge auszuwählen, sodass diese dann den einzelnen Buttons zugewiesen werden können. Im erstellten Papierprototyp war es so, dass nach dem Auswählen eines Klangs, ein UI-Element erscheint, das per Drag-and-Drop auf einen der Buttons gezogen wird: das würde zwar schön aussehen, ist jedoch langsamer als die Zuweisung per Maus-Klick/Tastatur-Eingabe und da man als Nutzer in der Lage sein sollte schnell Klänge den unterschiedlichen Buttons zuzuweisen, wurde beschlossen dadrauf zu verzichten.
Beim **BackgroundBeat-Bereich** hat man als Benutzer die Möglcihekeit einen Klang auszuwählen, der ununterbrochen im Hintergrund abgespielt wird. Die Benutzer können dabei die Lautstärke und die Geschwindigkeit des BackgroundBeats einzustellen. Im **Visualizer-Beriech** wird, sowohl der BackgrundBeat, als auch die, mithilfe des Button-Pads erzeugten, Klänge visualisiert.

Da während der Entwicklung neue Ideen für weitere Werkzeuge dazukamen (Zum Beispiel das Metronom), wurde beschlossen das UI-Konzept zu verändern: Hinzu kam der *'Add-Tool'-Button*, der es erlaubt weitere Werkzeuge auszuwählen, damit diese im UI der Anwendung angezeigt werden können. Wenn man ein Werkzeug nicht brauchen sollte, dann können die Nutzer anhand des '-'-Buttons, der auf jedem Werkzeug platziert ist, das Werkzeug schließen. Diese Änderung des UI-Konzeptes war notwendig, um die geforderte Übersichtlichkeit zu erhalten, da ansonsten die Benutzeroberfläche zu überladen wirken würde. Diese Änderung erlaubt es also dem Benutzer die Benutzeroberfläche an seine Bedürfnisse anzupassen, was effektives Arbeiten mit der Anwendung ermöglicht.

![UML-Use-Case Diagramm der Anwendung](https://i.ibb.co/cXQsTLx/usecase.png)

Folgende Tools wurden implementiert:
- *Metronom*
- *RecordingTool* (Zum Aufzeichnen der Audioausgabe)
- *UploadingTool* (Zum Hochladen von neuen Audiodateien)
- *BackgrundBeat* (BackgroundBeat-Tool als optionale Anwendung)


Das erstellte UI kann man auf der nachfolgenden Abbildung sehen (Alle Tools sind aktiviert): 

<center>
<img src="https://heartbleed.de/ressources/app.png" alt="logo" width="800"/>
</center>

<br>
<br>


## Anwendungsarchitektur

![UML-Klassendiagramm der Anwendung](https://i.ibb.co/Xxyn1c8/klassendiagram.png)

Für die Entwicklung des Frontends wurde React ausgewählt. React ist eine JavaScript-Library, die es erlaubt schnell und einfach das Frontend für Webseiten zu erstellen. Für die Grundlage des Projekts wurde `create-react-app` erzeugt. Mit create-react-app kann eine vorkonfigurierte Entwicklungsumgebung mit allen benötigten Libraries und einem Webserver erzeugt werden. Für CSS wurde des Weiteren `bootstrap` verwendet, eine CSS-Library, die es erlaubt schnelle ästhetische und ansprechende Webseiten-Elemente zu erzeugen. Zur Wiedergabe von Audio wurde die Web Audio API benutzt. Zudem wurden Animationen benutzt (Zum Beispiel Fade-In beim erstellen eines neuen Tools), die mithilfe von `react-spring` umgesetzt wurden.

React erlaubt es Webseiten komponentenbasiert zu Entwickeln. Jedes UI-Element der Webseite kann als eine getrennte Komponente repräsentiert werden, wobei die einzelnen Komponenten aus anderen Komponenten zusammengesetzt werden können. React stellt dafür die Klasse `Component` zur Verfügung, von der alle erstellten Komponenten erben müssen. Im oben abgebildeten Klassendiagramm des Projekts ist der generelle Aufbau der Anwendung zusehen (Die mit grau gekennzeichneten Klassen sind keine React-Komponenten). Statt Component wurde jedoch fast ausschließlich `PureComponent` benutzt, da bei dieser Klasse die `render()`-Methode nur aufgerufen wird, wenn sich der Zustand der Komponente verändert, was postiven Einfluss auf die Performance hat. Denn bei der normalen Component-Klasse wird die `render()`-Methode jedes mal aufgerufen, wenn sich etwas am Zustand der Eltern-Komponente ändert.

Wie man in der Abbildung sehen kann, enthält die Komponente *Application* alle UI-Komponenten der Anwendung. Folgende Komponenten sind in *Application* fest implementiert: *Visualizer, ButtonPad, MapSound*. Folgende Komponenden können mit dem 'AddTool'-Button hinzugefügt werden: *BackgroundBeat, Metronom, RecordingTool, UploadingTool*. Die ButtonPad-Komponente enthält MusicButton-Komponenten. Die MusicButton-Komponenten wiederum stellen die Buttons der Drum Machine dar und nutzen zudem die Klasse Klasse-PadSound zum Abspielen von Klängen. Die BackgroundBeat-Komponente benutzt die Klasse BackgroundBeatPlayer zur Wiedergabe des Hintergrund-Beats. Die meisten wichtigen Informationen (wie zum Beispiel die Liste mit allen abspielbaren Klängen) werden zentral in der Klasse Application verwaltet und bei Bedarf an die verbundenen Komponenten weitergereicht.

Wenn man mit Web Audio API arbeitet, müssen die Nodes, die für die Audio-Wiedergabe zuständig sind, mit dem Destination-Node verbunden werden, sodass man die wiedergegebene Audio hören kann. Nun ist es aber so, dass in der entwickelten Anwendung zwischen Destination und dem Input mehrere Nodes zwischengeschaltet werden muss: **AnalyserNode**(Damit alle abgespielten Sounds visualisiert werden können) und **Effekte**, die auf das Audio-Input angewendet werden (GainNode, Highpass-Filter, Lowpass-Filter). Dazu kommt noch, dass die Audio-Wiedergabe aufgenommen werden kann, weshalb man mit den MediaRecorder an den DestinationNode angeschlossen hat, sodass alles, was wiedergegeben wird, aufzeichnet werden kann.

![web-audio-api:vom input zur destination](https://i.ibb.co/dDwBvsZ/webAPI.png)

