import React, { Component, PropTypes } from "react";

import "./NewChart.css";

export default class NewChart extends Component {
	static propTypes = { createChart: PropTypes.func.isRequired };

	constructor(props) {
		super(props);
			this.state ={
				labels: [],
				name: '',
				newLabel: ''
			}

		this.handleNameChange = this.handleChange.bind(this, 'name');
		this.handleLabelChange = this.handleChange.bind(this, 'newLabel');
		this.addLabel = this.addLabel.bind(this);
		this.submitChart = this.submitChart.bind(this);
	}

// this class method handles the changes to the fields for creating a new chart
// they are bound above to differenciate between the label field and name field
	handleChange(field, event) {
		this.setState({ [field]: event.target.value });
	}

// this class method adds a new label to the array of labels to create a new chart
// the first function prevents the page from reloading
// the method adds the new label to the end of the array using a spread operator
// the state is updated using setState
	addLabel(event) {
		event.preventDefault();
		this.setState({
			labels: [...this.state.labels, this.state.newLabel],
			newLabel: '' 
			 }
		);
	}

// this class method submits the chart
// it first tests if the new chart has a name and at least three data labels
// if so, it sends the labels and name to the createChart method
// it also clears the new chart input fields back to their defaults
	submitChart() {
		if (!this.state.name || this.state.labels.length < 3) {
			return;
		}
		else {
			this.props.createChart(this.state.labels, this.state.name);
			this.setState({
				labels: [],
				name: '', 
				newLabel: ''
			});
		}
	}

	render() {
// this destructures the objects so we don't have to type this.state.label, etc.
		const {
			labels,
			name,
			newLabel
		} = this.state;

		return (
			<div className="new-chart">
				<div className="new-chart__form-group">
					<label className="new-chart__label">Chart Name:</label>
					<input
						className="new-chart__name new-chart__input"
						type="text"
						onChange={ this.handleNameChange } // bound above to handelChange
						value={ name }
					/>
				</div>
				<form className="new-chart__form-group" // onSubmit adds the label to the array upon hitting enter
				onSubmit={ this.addLabel }>
					<label className="new-chart__label">Add Label:</label>
					<input
						className="new-chart__category new-chart__input"
						required
						type="text"
						onChange={ this.handleLabelChange } // bound above to handleChange
						value={ newLabel }
					/>
				</form>

				<div className="new-chart__labels-wrapper">
					<label className="new-chart__label">Labels:</label>
					<span className="new-chart__labels">[{ labels.join(", ") }](Min. 3)</span>
				</div>

				<button className="new-chart__submit" onClick={ this.submitChart }>
					Submit
				</button>
			</div>
		);
	}
}
