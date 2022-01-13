import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { GitHubAcePropertyPane } from './GitHubAcePropertyPane';
import { Octokit } from '@octokit/rest';

export interface IGitHubAceAdaptiveCardExtensionProps {
  title: string;
  iconProperty: string;
  apiKey: string;
}

export interface IGitHubAceAdaptiveCardExtensionState {
  userData: any;
}

const CARD_VIEW_REGISTRY_ID: string = 'GitHubAce_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'GitHubAce_QUICK_VIEW';

export default class GitHubAceAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IGitHubAceAdaptiveCardExtensionProps,
  IGitHubAceAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: GitHubAcePropertyPane | undefined;

  public async onInit(): Promise<void> {
    let userData: any;

    // If API Key is specified
    if(this.properties.apiKey) {
      // Create an instance of Octokit
      let octokit = new Octokit({
        auth: this.properties.apiKey
      });

      // Get the authenticated user data
      userData = await octokit.users.getAuthenticated();
      console.log(userData.data);
    }

    this.state = {
      userData: userData.data
    };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  public get title(): string {
    return this.properties.title;
  }

  protected get iconProperty(): string {
    return this.properties.iconProperty || require('./assets/SharePointLogo.svg');
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'GitHubAce-property-pane'*/
      './GitHubAcePropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.GitHubAcePropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane!.getPropertyPaneConfiguration();
  }
}
