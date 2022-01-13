import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'GitHubAceAdaptiveCardExtensionStrings';
import { IGitHubAceAdaptiveCardExtensionProps, IGitHubAceAdaptiveCardExtensionState } from '../GitHubAceAdaptiveCardExtension';

export interface IQuickViewData {
  userData: any;
  strings: IGitHubAceAdaptiveCardExtensionStrings;
}

export class QuickView extends BaseAdaptiveCardView<
  IGitHubAceAdaptiveCardExtensionProps,
  IGitHubAceAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    return {
      userData: this.state!.userData,
      strings: strings
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }
}