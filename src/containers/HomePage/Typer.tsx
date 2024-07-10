import { APP_NAME } from "@/configs/const";
import { Component } from "react";

const TYPING_SPEED = 200;
const DELETING_SPEED = 30;
const DELETE_AFTER = 5000; // 500

interface TyperProps {
  dataText: string[];
  maxLength?: number;
}

interface TyperState {
  text: string;
  isDeleting: boolean;
  isPause: boolean;
  loopNum: number;
  typingSpeed: number;
}

class Typer extends Component<TyperProps, TyperState> {
  maxLength = 25;
  listWords: string[] = [];

  constructor(props: TyperProps) {
    super(props);
    this.maxLength = this.props.maxLength || 25;
    this.listWords = this.props.dataText.filter(
      (m) => m.length <= this.maxLength
    );
  }

  state: TyperState = {
    text: "",
    isDeleting: false,
    isPause: false,
    loopNum: 0,
    typingSpeed: TYPING_SPEED,
  };

  UNSAFE_componentWillReceiveProps(
    nextProps: Readonly<TyperProps>,
    nextContext: any
  ): void {
    this.listWords = nextProps.dataText.filter(
      (m) => m.length <= this.maxLength
    );
  }

  componentDidMount() {
    this.handleType();
  }

  handleType = () => {
    const { isDeleting, loopNum, text, typingSpeed, isPause } = this.state;

    if (isPause) {
      setTimeout(this.handleType, typingSpeed);
      return;
    }

    const i = loopNum % this.listWords.length;
    const fullText = this.listWords[i] || APP_NAME;

    this.setState({
      text: isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1),
      typingSpeed: isDeleting ? DELETING_SPEED : TYPING_SPEED,
    });

    if (!isDeleting && text === fullText) {
      if (!isPause) {
        this.setState({ isPause: true });
        setTimeout(
          () => this.setState({ isPause: false, isDeleting: true }),
          DELETE_AFTER
        );
      }
    } else if (isDeleting && text === "") {
      this.setState({
        isDeleting: false,
        loopNum: loopNum + 1,
      });
    }

    setTimeout(this.handleType, typingSpeed);
  };

  render() {
    return (
      <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
        <span>{this.state.text || ""}</span>
        <span
          className="text-gray-500 animate-blink"
          style={{ fontWeight: "200" }}
        >
          |
        </span>
      </h2>
    );
  }
}

export default Typer;
