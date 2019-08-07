import React from "react";
import { connect } from "react-redux";

import "./ActiveBuilds.scss";

import line from "./Line.svg";
import gear from "./Gear.svg";

import * as actions from "../redux/action";

export class ActiveBuild extends React.Component {
  getEventWording() {
    switch (this.props.event) {
      case "push":
        return "pushed";

      default:
        return this.props.event;
    }
  }

  getAfterWording() {
    return this.props.after;
  }

  getSourceWording() {
    return this.props.source;
  }

  render() {
    return (
      <div className="ActiveBuild">
        <span className="repo">
          <img src={gear} alt="Building" />
          <span>{this.props.repoSlug}</span>
        </span>
        <div className="message">
          #{this.props.number}. {this.props.message}
        </div>
        <div className="event">
          <img src={line} alt="Line" />
          <img
            className="avatar"
            src={this.props.authorAvatar}
            alt={this.props.authorName}
          />
          <span>{this.getEventWording()}</span>
          <span className="repo-item-label">{this.props.after}</span>
          <span> to </span>
          <span className="repo-item-label">{this.props.source}</span>
        </div>
      </div>
    );
  }
}

export function ActiveBuilds(props) {
  return (
    <div className="ActiveBuilds">
      <button onClick={props.loadBuilds}>LOAD BUILDS</button>
      <button onClick={props.watchBuilds}>WATCH BUILDS</button>
      <button onClick={props.latestBuild}>LATEST BUILD</button>
      {props.builds.map(build => (
        <ActiveBuild
          key={`${build.repoSlug}-${build.number}`}
          repoSlug={build.repoSlug}
          message={build.message}
          number={build.number}
          event={build.event}
          after={build.after}
          source={build.source}
          authorName={build.authorName}
          authorAvatar={build.authorAvatar}
        />
      ))}
    </div>
  );
}

const mapStateToProps = state => ({
  builds: Object.values(state.builds).filter(
    build => build.status === "running"
  )
});

const mapDispatchToProps = {
  loadBuilds: () => actions.fetchBuilds(),
  watchBuilds: () => actions.watchBuilds(),
  latestBuild: () => actions.fetchLatestBuild("owner", "name", "branch")
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveBuilds);
