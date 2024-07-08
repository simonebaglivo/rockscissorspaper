// Importing: React.
import React from "react";

// Importing: Project components.
import BackHomeButton from "./BackHomeButton";
import {
  faHand,
  faHandBackFist,
  faHandLizard,
  faHandSpock,
  faScissors,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const initialDescription = "Scegli per primo e scopri il risultato.";

export default function RockScissorPaper() {
  // Declaring States.
  const [total, setTotal] = React.useState([0, 0]);
  const [hideIcon, setHideIcon] = React.useState(true);
  const [isRandom, setIsRandom] = React.useState(true);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [arePlaying, setArePlaying] = React.useState(true);
  const [isRivalHuman, setIsRivalHuman] = React.useState(false);
  const [icons, setIcons]: any = React.useState([faHand, faHand]);
  const [firstName, setFirstName] = React.useState("Giocatore 1");
  const [firstChoice, setFirstChoice]: any = React.useState(null);
  const [secondName, setSecondName] = React.useState("Giocatore 2");
  const [isMatchStarted, setIsMatchStarted] = React.useState(false);
  const [isAdvancedMode, setIsAdvancedMode] = React.useState(false);
  const [randomChoice, setRandomChoice]: any = React.useState(null);
  const [description, setDescription] = React.useState(initialDescription);
  const [isFirstPlayerRound, setIsFirstPlayerRound] = React.useState(false);

  // Declaration spot.
  let newTotals = [0, 0];
  const hideButtons = arePlaying && isMatchStarted;
  const interval: any = React.useRef(setTimeout(() => {}, 0));
  const interval2: any = React.useRef(setTimeout(() => {}, 0));
  const interval3: any = React.useRef(setTimeout(() => {}, 0));
  const interval4: any = React.useRef(setTimeout(() => {}, 0));
  const mapChoices = ["Sasso", "Carta", "Forbici", "Lizard", "Spock"];
  // const firstPlayerHidden = isFirstPlayerRound && firstChoice !== null;
  const winIf: any = { 0: [2, 3], 1: [0, 4], 2: [1, 3], 3: [4, 1], 4: [2, 0] };

  const mapIcons = [
    faHandBackFist,
    faHand,
    faScissors,
    faHandLizard,
    faHandSpock,
  ];

  React.useEffect(() => {
    if (!isRandom) return;
    startRandomMatch();
  }, [isRandom, isAdvancedMode]);

  React.useEffect(() => {
    if (!isRandom) return;
    const time = isPlaying ? 5000 : 2000;

    interval.current = window.setTimeout(() => {
      setIsPlaying(!isPlaying);
    }, time);
  }, [isPlaying, isRandom, isAdvancedMode]);

  React.useEffect(() => {
    if (isPlaying) return;
    if (!isRandom) return;
    if (hideIcon) return setHideIcon(false);

    interval2.current = window.setTimeout(() => {
      return setHideIcon(true);
    }, 2000);
  }, [isPlaying, hideIcon, isRandom, isAdvancedMode]);

  const delayRandom = () => {
    return (interval3.current = window.setTimeout(() => {
      startRandomMatch();
    }, 2000));
  };

  const startRandomMatch = () => {
    setTotal([...newTotals]);

    interval4.current = window.setTimeout(() => {
      randomMatch();
    }, 5000);
  };

  const randomMatch = () => {
    const choiceNumbers = isAdvancedMode ? 5 : 3;
    const firstRandom = Math.floor(Math.random() * choiceNumbers);
    const secondRandom = Math.floor(Math.random() * choiceNumbers);
    setIcons([mapIcons[firstRandom], mapIcons[secondRandom]]);
    if (firstRandom === secondRandom) return delayRandom();

    if (winIf[firstRandom].includes(secondRandom)) {
      newTotals = [newTotals[0] + 1, newTotals[1]];
      return delayRandom();
    }

    newTotals = [newTotals[0], newTotals[1] + 1];
    return delayRandom();
  };

  const winFirstPlayer = ({ value, firstValue }: any) => {
    const newTotal = total[0] + 1;
    setTotal([newTotal, total[1]]);
    const humanDescription = `${mapChoices[firstValue]} batte ${mapChoices[value]}. Tocca a ${firstName}`;

    if (newTotal === 3) {
      setArePlaying(false);

      return setDescription(
        `Bravo, ${firstName && firstName + ","} hai vinto la partita!`
      );
    }

    if (isRivalHuman) return setDescription(humanDescription);
  };

  const winSecondPlayer = ({ value, firstValue }: any) => {
    const newTotal = total[1] + 1;
    setTotal([total[0], newTotal]);
    const humanDescription = `${mapChoices[value]} batte ${mapChoices[firstValue]}. Tocca a ${firstName}`;

    const humanWin = `Bravo, ${
      secondName && secondName + ","
    } hai vinto la partita!`;

    if (newTotal === 3) {
      setArePlaying(false);
      if (isRivalHuman) return setDescription(humanWin);
    }

    if (isRivalHuman) return setDescription(humanDescription);
  };

  const choice = (value: number) => {
    const choiceNumbers = isAdvancedMode ? 5 : 3;
    const randomValue = Math.floor(Math.random() * choiceNumbers);

    if (isRivalHuman) {
      setIsFirstPlayerRound(!isFirstPlayerRound);
      setDescription(`E' il tuo turno, ${secondName}`);
      if (!isFirstPlayerRound) return setFirstChoice(value);
    } else setRandomChoice(randomValue);

    const firstValue = isRivalHuman ? firstChoice : randomValue;

    if (firstValue === value) {
      return setDescription(
        `Stessa scelta, nessun vincitore! Vai ${firstName}`
      );
    }

    const props = { value, firstValue };

    if (winIf[value].includes(firstValue)) {
      return isRivalHuman ? winSecondPlayer(props) : winFirstPlayer(props);
    }

    isRivalHuman ? winFirstPlayer(props) : winSecondPlayer(props);
  };

  const clearIntervals = () => {
    clearTimeout(interval.current);
    clearTimeout(interval2.current);
    clearTimeout(interval3.current);
    clearTimeout(interval4.current);
  };

  const startPlaying = (description = initialDescription) => {
    clearIntervals();
    setTotal([0, 0]);
    setIsRandom(false);
    setArePlaying(true);
    setFirstChoice(null);
    setRandomChoice(null);
    setDescription(description);
    setIsFirstPlayerRound(false);
    if (!isMatchStarted) setIsMatchStarted(true);
  };

  const changeRival = () => {
    setIsRivalHuman(!isRivalHuman);
    startPlaying(isRivalHuman ? "" : `Buon divertimento, inizia ${firstName}`);
  };

  const changeMode = () => {
    clearIntervals();
    setIsAdvancedMode(!isAdvancedMode);

    const newDescription = isRivalHuman
      ? `Buon divertimento, inizia ${firstName}`
      : initialDescription;

    if (!isRandom) return startPlaying(newDescription);
  };

  const buttons = (isFirstPlayer = false) =>
    mapChoices.map((value: string, index: number) => {
      const isTheSamePlayer = isFirstPlayer === isFirstPlayerRound;

      const className = `game-split__icons ${
        isFirstPlayer && "game-split__icons-2"
      }`;

      return (
        <button
          className={className}
          hidden={!isAdvancedMode && index > 2}
          key={`${value}, ${index}, ${isFirstPlayer}`}
          disabled={!isMatchStarted || !arePlaying || isTheSamePlayer}
          onClick={() => {
            choice(index);
          }}
        >
          <FontAwesomeIcon icon={mapIcons[index]} size="2x" />
        </button>
      );
    });

  // const hideDescription = !isRivalHuman || firstPlayerHidden;

  return (
    <>
      <div className="game">
        <div className="game__board">
          <div style={{ marginLeft: 20 }}>
            <BackHomeButton />
          </div>

          <input
            type="text"
            defaultValue={firstName}
            hidden={!isMatchStarted || !isRivalHuman}
            onChange={(event: any) => setFirstName(event.target.value)}
          />

          <div className="game-split">
            <span className="game__board__total">{total[0]}</span>

            <div hidden={isMatchStarted}>
              <button
                disabled={true}
                hidden={!isPlaying}
                className="game-split__icons game-split__icons-2 hover-disabled"
              >
                <FontAwesomeIcon icon={mapIcons[0]} size="2x" />
              </button>

              <button
                disabled={true}
                hidden={hideIcon}
                className="game-split__icons game-split__icons-0"
              >
                <FontAwesomeIcon icon={icons[0]} size="2x" />
              </button>
            </div>
            <div hidden={!isMatchStarted}>{buttons(true)}</div>
          </div>

          <div className="game-split">
            <div className="game-split__buttons">
              <button
                onClick={() => startPlaying()}
                style={{ display: hideButtons ? "none" : "initial" }}
              >
                {!isMatchStarted
                  ? "Sfida il computer"
                  : "Gioca una nuova partita"}
              </button>

              <button
                onClick={changeRival}
                style={{ display: hideButtons ? "none" : "initial" }}
              >
                Sfida {isRivalHuman ? "il computer" : "un tuo amico"}
              </button>

              <button
                onClick={changeMode}
                style={{ display: hideButtons ? "none" : "initial" }}
              >
                Prova la modalita' {isAdvancedMode ? "normale" : "avanzata"}
              </button>

              <div style={{ display: !isRivalHuman ? "none" : "initial" }}>
                {description}
              </div>
            </div>
          </div>

          <div className="game-split">
            <div hidden={!isMatchStarted}>
              {isRivalHuman ? (
                buttons()
              ) : (
                <button
                  disabled={true}
                  hidden={randomChoice === null}
                  className="game-split__icons game-split__icons-4"
                >
                  <FontAwesomeIcon
                    size="2x"
                    icon={mapIcons[randomChoice] || faHand}
                  />
                </button>
              )}
            </div>

            <div hidden={isMatchStarted}>
              <button
                disabled={true}
                hidden={!isPlaying}
                className="game-split__icons game-split__icons-3 hover-disabled"
              >
                <FontAwesomeIcon icon={mapIcons[0]} size="2x" />
              </button>

              <button
                disabled={true}
                hidden={hideIcon}
                className="game-split__icons game-split__icons-4"
              >
                <FontAwesomeIcon icon={icons[1]} size="2x" />
              </button>
            </div>

            <span className="game__board__total game__board__total-2">
              {total[1]}
            </span>
          </div>

          <input
            type="text"
            hidden={!isRivalHuman}
            defaultValue={secondName}
            onChange={(event: any) => setSecondName(event.target.value)}
          />
        </div>
      </div>
    </>
  );
}
