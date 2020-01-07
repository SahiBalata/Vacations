import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { connect } from "react-redux";
import {
  setIsLoggedIn,
  setFollowedVacations,
  setUnFollowedVacations
} from "../../../redux/action";

class AdminChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: this.props.chartVacationName,
        datasets: [
          {
            label: "Follows ammout",
            data: this.props.chartVacationFollows,
            backgroundColor: []
          }
        ]
      }
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.chartVacationName !== prevProps.chartVacationName) {
      let colors = [];
      this.props.chartVacationFollows.map(i => {
        colors.push("rgba(255, 206, 86, 0.6)");
      });
      this.setState({
        chartData: {
          labels: this.props.chartVacationName,
          datasets: [
            {
              label: "Follows ammout",
              data: this.props.chartVacationFollows,
              backgroundColor: colors
            }
          ]
        }
      });
      console.log("Tomer");
    } else if (
      this.props.chartVacationFollows !== prevProps.chartVacationFollows
    ) {
      let colors = [];
      this.props.chartVacationFollows.map(i => {
        colors.push("rgba(255, 206, 86, 0.6)");
      });
      this.setState({
        chartData: {
          labels: this.props.chartVacationName,
          datasets: [
            {
              label: "Follows ammout",
              data: this.props.chartVacationFollows,
              backgroundColor: colors
            }
          ]
        }
      });
      console.log("Tomer");
    }
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "top"
  };

  render() {
    return (
      <div className="chart">
        <Bar
          data={this.state.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: "Follows Chart",
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.isLoggedIn,
    isAdmin: state.isAdmin,
    userName: state.userName,
    followedVacations: state.followedVacations,
    unfollowedVacations: state.unfollowedVacations,
    chartVacationName: state.chartVacationName,
    chartVacationFollows: state.chartVacationFollows
  }),
  { setIsLoggedIn, setFollowedVacations, setUnFollowedVacations }
)(AdminChart);
