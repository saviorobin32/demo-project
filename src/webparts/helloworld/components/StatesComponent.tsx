import * as React from 'react';
import { spfi, SPFx } from '@pnp/sp';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

interface StatesComponentProps {
  onStateChange: (selectedState: string) => void;
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
    this.sp = spfi().using(SPFx(this.context));
  }

  componentDidMount() {
    this.fetchStates();
  }

  fetchStates = async () => {
    const items = await this.sp.web.lists.getByTitle('States').items.get();
    this.setState({ states: items });
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
