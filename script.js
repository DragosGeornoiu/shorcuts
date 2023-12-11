const challenges = [
    {
        code: `List<String> lines = Collections.emptyList();
        try {
          BufferedReader br =
              new BufferedReader(
                  new FileReader("src/main/java/ro/dragos/geornoiu/year2023/day09/input.txt"));

          lines = br.lines().toList();
        } catch (FileNotFoundException e) {
          e.printStackTrace();
        }`,
        explanation: "Refactor this code into a new method using the appropriate shortcut.'.",
        expectedShortcut: "Control-M"
    },
    // Add more challenges as needed
];

let currentChallengeIndex = 0;
let pressedKeys = [];

// Initialize CodeMirror
const codeMirrorEditor = CodeMirror.fromTextArea(document.getElementById("codeMirrorEditor"), {
    lineNumbers: true,
    mode: "text/x-java",
    readOnly: true, // Set to true for challenges
});

// Display the initial challenge
displayChallenge();

// Register global key press and release events
document.addEventListener("keydown", handleKeyPress);
document.addEventListener("keyup", handleKeyPress);

// Text area for displaying the last pressed shortcut
const shortcutDisplay = document.getElementById("shortcutDisplay");

function displayChallenge() {
    const challenge = challenges[currentChallengeIndex];

    // Set the CodeMirror content
    codeMirrorEditor.setValue(challenge.code);

    const explanationContainer = document.getElementById("explanationContainer");
    explanationContainer.textContent = challenge.explanation;
}

function handleKeyPress(event) {
    // Capture the key pressed by the user
    const keyPressed = event.key;

    if (event.type === "keydown" && !pressedKeys.includes(keyPressed)) {
        // Add the pressed key to the list on keydown
        pressedKeys.push(keyPressed);
    } else if (event.type === "keyup") {
        // Remove the released key from the list on keyup
        const index = pressedKeys.indexOf(keyPressed);
        if (index !== -1) {
            pressedKeys.splice(index, 1);
        }
    }

    // Display the current combination of pressed keys
    shortcutDisplay.value = pressedKeys.join(" + ");

    // Prevent default behavior for specific key combinations related to the browser
    const isBrowserShortcut = event.ctrlKey || event.altKey || event.metaKey || event.shiftKey;
    if (isBrowserShortcut) {
        event.preventDefault();
    }
}
