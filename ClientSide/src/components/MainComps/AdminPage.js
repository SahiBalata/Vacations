import React, { Component, useState } from "react";
import AddVacation from "./adminComps/AddVacation";
import EditVacation from "./adminComps/EditVacation";
import DeleteVacation from "./adminComps/DeleteVacation";
import AddVacationModal from "./adminComps/AddVacationModal";
import EditVacationModal from "./adminComps/EditVacationModal";
import DeleteVacationModal from "./adminComps/DeleteVacationModal";
import AdminChart from "./adminComps/AdminChart";
import {
  setIsLoggedIn,
  setFollowedVacations,
  setUnFollowedVacations,
  setVacationNames,
  setVacationFollowers
} from "../../redux/action";

import { connect } from "react-redux";
import Button from "react-bootstrap/Button";

class AdminPage extends Component {
  state = {
    addModalShow: false,
    deleteModalShow: false,
    editModalShow: { show: false, page: 1, vacationsToEdit: [] },
    deleteModalShow: true,
    staticName: "",
    vacationsToDelete: [],
    requestedVacation: [],
    vacationsNameForChart: [],
    vacationsFollowersForChart: [],
    chartData: {}
  };

  componentDidMount() {
    this.setState({
      addModalShow: false,
      deleteModalShow: true,
      editModalShow: { show: false, page: 1, vacationsToEdit: [] },
      deleteModalShow: false,
      requestedVacation: {}
    });
    const { setFollowedVacations } = this.props;
    const { setUnFollowedVacations } = this.props;
    const { setVacationFollowers } = this.props;
    const { setVacationNames } = this.props;
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
        let vacationNameArr = [];
        let vacationFollowersArr = [];
        vacationsList.map(v => {
          vacationNameArr.push(v.name);

          vacationFollowersArr.push(Number(v.followers));
        });

        setVacationNames(vacationNameArr);
        setVacationFollowers(vacationFollowersArr);
        console.log(this.props);
      });
  }

  //Adding vacattion Modal sector
  setAddModalShowTrue = () => {
    this.setState({ addModalShow: true });
  };
  setAddModalShowFalse = () => {
    this.setState({ addModalShow: false });
  };
  handleAddSubmit = e => {
    e.preventDefault();
    let vacationName = document.getElementById("vacationName").value;
    let description = document.getElementById("description").value;
    let destination = document.getElementById("destination").value;
    let imgLink = document.getElementById("imgLink").value;
    let fromVal = document.getElementById("from").value;
    let to = document.getElementById("to").value;
    let price = document.getElementById("price").value;
    let dataToFetch = {
      vacationName,
      description,
      destination,
      imgLink,
      from: fromVal,
      to,
      price
    };
    let jsonedData = JSON.stringify(dataToFetch);
    fetch("http://localhost:4000/vacations/addvacation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: jsonedData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        } else if (response.status === 200) {
          return response.text();
        }
        return response.text();
      })
      .then(data => {
        alert(data);
        if (data === "Vacation Added") {
          this.setAddModalShowFalse();
        }
      })
      .catch(error => {
        throw error;
      });
  };

  //Edit vacation modal sector
  setEditModalShowTrue = () => {
    // this.setState({ editModalShow: true });
    fetch("http://localhost:4000/vacations/getvacations")
      .then(response => {
        return response.text();
      })
      .then(d => {
        let data = JSON.parse(d);
        this.setState({
          editModalShow: { show: true, page: 1, vacationsToEdit: data }
        });
      });
  };
  setEditModalShowFalse = () => {
    this.setState({
      editModalShow: { show: false, page: 1, vacationsToEdit: [] }
    });
  };

  getVacationDataFromButton = e => {
    console.log(e.target.innerText);
    let obj = { name: e.target.innerText };
    let jsonedData = JSON.stringify(obj);
    fetch("http://localhost:4000/vacations/getspecificvacationdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: jsonedData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        } else if (response.status === 200) {
          return response.text();
        }
        return response.text();
      })
      .then(d => {
        let data = JSON.parse(d);
        this.setState({
          requestedVacation: data[0],
          staticName: data[0].name,
          editModalShow: { show: true, page: 2, vacationsToEdit: [] }
        });
        console.log(this.state);
      })
      .catch(error => {
        throw error;
      });
  };

  handleEditSubmit = e => {
    e.preventDefault();
    let editName = document.getElementById("editName").value;
    let editDescription = document.getElementById("editDescription").value;
    let editDestination = document.getElementById("editDestination").value;
    let editImgLink = document.getElementById("editImgLink").value;
    let editFrom = document.getElementById("editFrom").value;
    let editTo = document.getElementById("editTo").value;
    let editPrice = document.getElementById("editPrice").value;
    let prevName = this.state.staticName;

    let obj = {
      editName,
      editDescription,
      editDestination,
      editImgLink,
      editFrom,
      editTo,
      editPrice,
      prevName
    };

    let jsonedData = JSON.stringify(obj);
    fetch("http://localhost:4000/vacations/editvacation", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: jsonedData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        } else if (response.status === 200) {
          return response.text();
        }
        return response.text();
      })
      .then(data => {
        alert(data);
        this.setEditModalShowFalse();
      })
      .catch(error => {
        throw error;
      });
  };

  handleChange = () => {
    this.setState({
      requestedVacation: {
        vac_id: this.state.requestedVacation.vac_id,
        name: document.getElementById("editName").value,
        description: document.getElementById("editDescription").value,
        destination: document.getElementById("editDestination").value,
        img_link: document.getElementById("editImgLink").value,
        depart: document.getElementById("editFrom").value,
        return_time: document.getElementById("editTo").value,
        price: document.getElementById("editPrice").value,
        followers: this.state.requestedVacation.followers
      }
    });
    console.log(this.state.requestedVacation);
  };

  //Delete Modal Section
  setDeleteModalShowTrue = () => {
    fetch("http://localhost:4000/vacations/getvacations")
      .then(response => {
        return response.text();
      })
      .then(d => {
        let data = JSON.parse(d);
        console.log(data);
        this.setState({ deleteModalShow: true, vacationsToDelete: data });
      });
  };
  handleDelete = e => {
    let obj = { name: e.target.innerText };
    let jsonedData = JSON.stringify(obj);
    fetch("http://localhost:4000/vacations/deletevacation", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: jsonedData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        } else if (response.status === 200) {
          return response.text();
        }
        return response.text();
      })
      .then(data => {
        alert(data);
        this.setDeleteModalShowFalse();
      });
  };

  setDeleteModalShowFalse = () => {
    this.setState({ deleteModalShow: false });
  };

  render() {
    if (!this.props.isAdmin) {
      return (
        <div>
          <h1>Page is restricted</h1>
        </div>
      );
    } else {
      return (
        <>
          <div className="adminPage">
            {" "}
            <AddVacation click={this.setAddModalShowTrue} />
            <EditVacation click={this.setEditModalShowTrue} />
            <DeleteVacation click={this.setDeleteModalShowTrue} />
          </div>
          <AddVacationModal
            show={this.state.addModalShow}
            onHide={this.setAddModalShowFalse}
            createvacation={this.handleAddSubmit}
          />
          <EditVacationModal
            show={this.state.editModalShow.show}
            onHide={this.setEditModalShowFalse}
            vacations={this.state.editModalShow.vacationsToEdit}
            page={this.state.editModalShow.page}
            selectedVacation={this.state.requestedVacation}
            staticName={this.state.staticName}
            getVacationDataFromButton={this.getVacationDataFromButton}
            handleEditSubmit={this.handleEditSubmit}
            change={this.handleChange}
          />
          <DeleteVacationModal
            show={this.state.deleteModalShow}
            onHide={this.setDeleteModalShowFalse}
            vacations={this.state.vacationsToDelete}
            click={this.handleDelete}
          />
          <AdminChart chartData={this.state.chartData} />
        </>
      );
    }
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
  {
    setIsLoggedIn,
    setFollowedVacations,
    setUnFollowedVacations,
    setVacationNames,
    setVacationFollowers
  }
)(AdminPage);
