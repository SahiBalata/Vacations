import React, { Component } from "react";
import VacationCard from "./homepageComps/VacationCard";
import DescriptionModal from "./homepageComps/DescriptionModal";
import {
  setIsLoggedIn,
  setFollowedVacations,
  setUnFollowedVacations
} from "../../redux/action";

import { connect } from "react-redux";

class HomePage extends Component {
  state = {
    modalShow: false,
    modalName: "",
    modalFrom: "",
    modalTo: "",
    modalDescription: "",
    userName: this.props.userName,
    isAdmin: this.props.isAdmin,
    vacations: []
  };
  constructor(props) {
    super(props);
  }

  setModalShowTrue = e => {
    let loadedCard = this.state.vacations.find(
      obj => obj.name === e.target.getAttribute("id")
    );

    this.setState({
      modalName: loadedCard.name,
      modalFrom: loadedCard.depart,
      modalTo: loadedCard.return_time,
      modalDescription: loadedCard.description,
      modalShow: true
    });
  };

  setModalShowFalse = () => {
    this.setState({ modalShow: false });
  };

  setNewFollow = e => {
    console.log(e.target.className);
    if (this.props.isAdmin) {
      alert("Admin is not allowed to follow");
    } else if (!this.props.isLoggedIn) {
      alert("Must be logged if you want to follow");
    } else {
      let obj = {
        vacation: e.target.getAttribute("id"),
        user: this.props.userName
      };
      let regJSONED = JSON.stringify(obj);
      fetch("http://localhost:4000/vacations/newfollower", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: regJSONED
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          } else if (response.status === 201) {
            return response.text();
          } else if (response.status === 200) {
            return response.text();
          }
        })
        .then(data => {
          console.log(data);
        });
    }
  };

  setUnfollow = e => {
    const { setFollowedVacations } = this.props;
    const { setUnFollowedVacations } = this.props;
    var vacationName = e.target.getAttribute("id");
    let obj = {
      vacation: e.target.getAttribute("id"),
      user: this.props.userName
    };

    let regJSONED = JSON.stringify(obj);
    fetch("http://localhost:4000/vacations/unfollow", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: regJSONED
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        } else if (response.status === 200) {
          console.log("Response is 200");
          return response.text();
        }
      })
      .then(data => {
        // setUnFollowedVacations(jsonedData.unFollowedList);
        // setFollowedVacations(jsonedData.followedListToSend);
        console.log(data);
      });
    console.log(this.props.followedVacations);
    let unfollowedVacation = this.props.followedVacations.filter(
      obj => obj.name === vacationName
    );

    let indexOfUnfollowedVacation = this.props.followedVacations.indexOf(
      unfollowedVacation[0]
    );
    this.props.followedVacations.splice(indexOfUnfollowedVacation, 1);
    this.props.unfollowedVacations.push(unfollowedVacation[0]);
    setFollowedVacations(this.props.followedVacations);
    setUnFollowedVacations(this.props.unfollowedVacations);
  };

  componentDidMount() {
    const { setFollowedVacations } = this.props;
    const { setUnFollowedVacations } = this.props;
    let obj = { userName: this.props.userName };
    let regJSONED = JSON.stringify(obj);
    fetch("http://localhost:4000/vacations/getfollowedvacations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: regJSONED
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        let jsonedData = JSON.parse(data);
        setUnFollowedVacations(jsonedData.unFollowedList);
        setFollowedVacations(jsonedData.followedListToSend);
        let vacationsList = this.props.followedVacations.concat(
          this.props.unfollowedVacations
        );
        this.setState({ vacations: vacationsList });
      });
  }

  componentDidUpdate(prevProps) {
    const { setFollowedVacations } = this.props;
    const { setUnFollowedVacations } = this.props;
    if (this.props.userName !== prevProps.userName) {
      let obj = { userName: this.props.userName };
      let regJSONED = JSON.stringify(obj);
      fetch("http://localhost:4000/vacations/getfollowedvacations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: regJSONED
      })
        .then(response => {
          return response.text();
        })
        .then(data => {
          let jsonedData = JSON.parse(data);
          setUnFollowedVacations(jsonedData.unFollowedList);
          setFollowedVacations(jsonedData.followedListToSend);
        });
    } else if (this.props.followedVacations !== prevProps.followedVacations) {
      let obj = { userName: this.props.userName };
      let regJSONED = JSON.stringify(obj);
      fetch("http://localhost:4000/vacations/getfollowedvacations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: regJSONED
      })
        .then(response => {
          return response.text();
        })
        .then(data => {
          let jsonedData = JSON.parse(data);
          setUnFollowedVacations(jsonedData.unFollowedList);
          setFollowedVacations(jsonedData.followedListToSend);
        });
    }
  }

  render() {
    return (
      <div className="homePage">
        {console.log(this.props)}
        {this.props.followedVacations.map(v => (
          <VacationCard
            key={v.name}
            name={v.name}
            description={v.description}
            destination={v.destination}
            img_link={v.img_link}
            from={v.depart}
            to={v.return_time}
            price={v.price}
            followers={v.followers}
            showModal={this.setModalShowTrue}
            setNewFollower={this.setNewFollow}
            setUnfollow={this.setUnfollow}
            isFollowed={v.isFollowed}
          />
        ))}
        {this.props.unfollowedVacations.map(v => (
          <VacationCard
            key={v.name}
            name={v.name}
            description={v.description}
            destination={v.destination}
            img_link={v.img_link}
            from={v.depart}
            to={v.return_time}
            price={v.price}
            followers={v.followers}
            showModal={this.setModalShowTrue}
            setNewFollower={this.setNewFollow}
            isFollowed={v.isFollowed}
          />
        ))}

        <DescriptionModal
          show={this.state.modalShow}
          onHide={this.setModalShowFalse}
          modalName={this.state.modalName}
          modalDescription={this.state.modalDescription}
          modalFrom={this.state.modalFrom}
          modalTo={this.state.modalTo}
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
    unfollowedVacations: state.unfollowedVacations
  }),
  { setIsLoggedIn, setFollowedVacations, setUnFollowedVacations }
)(HomePage);
