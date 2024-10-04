import * as React from 'react';
import { spfi, SPFx } from '@pnp/sp';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";

interface StatesComponentProps {
  onStateChange: (selectedState: string) => void;
  context: any;
}

interface StatesComponentState {
  states: { Id: number; Title: string }[];
}

class StatesComponent extends React.Component<StatesComponentProps, StatesComponentState> {
  private sp: ReturnType<typeof spfi>;

  constructor(props: StatesComponentProps) {
    super(props);
    this.state = {
      states: []
    };
    this.sp = spfi().using(SPFx(this.props.context));
  }

  componentDidMount() {
    this.fetchStates();
  }

  fetchStates = async () => {
    try {
      console.log("Fetching states...");
      const items = await this.sp.web.lists.getByTitle('States').items.select('Id', 'Title').getAll();
      console.log("Fetched items:", items);
      this.setState({ states: items });
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.onStateChange(event.target.value);
  };

  render() {
    const { states } = this.state;
    return (
      <div>
        <label htmlFor="stateSelect">State:</label>
        <select id="stateSelect" aria-label="State selection" onChange={this.handleChange}>
          <option value="">Select a state</option>
          {states.map(item => (
            <option key={item.Id} value={item.Title}>{item.Title}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default StatesComponent;