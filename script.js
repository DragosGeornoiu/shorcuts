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
        explanation: "Refactor this code into a new method using the shortcut 'Ctrl + M'.",
        expectedShortcut: "Control-M"
    },
    // Add more challenges as needed
];

let currentChallengeIndex = 0;

// Initialize CodeMirror
const codeMirrorEditor = CodeMirror.fromTextArea(document.getElementById("codeMirrorEditor"), {
    lineNumbers: true,
    mode: "text/x-java",
    readOnly: true, // Set to true for challenges
});

// Display the initial challenge
displayChallenge();

// Register global key press event
document.addEventListener("keydown", handleKeyPress);

function displayChallenge() {
    const challenge = challenges[currentChallengeIndex];

    // Set the CodeMirror content
    codeMirrorEditor.setValue(challenge.code);

    const explanationContainer = document.getElementById("explanationContainer");
    explanationContainer.textContent = challenge.explanation;
}

function handleKeyPress(event) {
    // Capture the key pressed by the user
    const keyPressed = event.key.toLowerCase();
    const isCtrlPressed = event.ctrlKey || event.metaKey; // Check if Ctrl key is pressed

    // Check if the pressed key matches the correct shortcut (Ctrl + M)
    const expectedShortcut = challenges[currentChallengeIndex].expectedShortcut;
    if (isCtrlPressed && keyPressed === "m") {
        const feedbackContainer = document.getElementById("feedbackContainer");
        feedbackContainer.textContent = "Correct! Next challenge.";
        currentChallengeIndex = (currentChallengeIndex + 1) % challenges.length;
        displayChallenge();
    } else {
        const feedbackContainer = document.getElementById("feedbackContainer");
        feedbackContainer.textContent = "Incorrect. Try again.";
    }

    // Prevent default behavior only for specific key combinations related to the browser
    if (isCtrlPressed) {
        console.log('pressed - ' + event.key.toLowerCase())
        event.preventDefault();
    }
}
