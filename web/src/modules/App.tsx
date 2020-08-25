import React, { useState, useCallback, useEffect, useRef } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Lobby</Link>
          </li>
          <li>
            <Link to="/about">Create</Link>
          </li>
          <li>
            <Link to="/users">Public</Link>
          </li>
          <li>
            <Link to="/users">Private</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

type HomeState = {
  name: string;
  code: string;
  grid: HTMLVideoElement[];
};

type VideoProps = {
  stream: any;
};

const Video = ({ stream }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  return (
    <video
      src={stream}
      ref={videoRef}
      onLoadedMetadata={() => {
        videoRef.current?.play();
      }}
    />
  );
};

function Home() {
  const [state, setState] = useState({ name: "", code: "", grid: [] });
  const onNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setState((p) => ({ ...p, name }));
  }, []);

  const onCodeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const code = e.target.value;
      setState((p) => ({ ...p, code }));
    },
    [state]
  );

  const addVideoStream = (stream: MediaStream) => {
    const V = <Video stream={stream} />;
    setState((p) => ({ ...p, grid: [...p.grid] }));
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        addVideoStream(stream);
      });
  }, []);

  return (
    <div>
      <input
        placeholder="name"
        type="name"
        value={state.name}
        onChange={onNameChange}
      />
      <video muted style={{ width: 200, height: 200 }}></video>
      <div>
        <button>create game</button>
      </div>
      <div>
        <button>find game</button>
      </div>
      <div>
        <button>join private</button>
        <input
          placeholder="enter code"
          type=""
          value={state.code}
          onChange={onCodeChange}
        />
      </div>
    </div>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
