import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'GitHubAceAdaptiveCardExtensionStrings';
import { IGitHubAceAdaptiveCardExtensionProps, IGitHubAceAdaptiveCardExtensionState } from '../GitHubAceAdaptiveCardExtension';

export interface IQuickViewData {
  subTitle: string;
  title: string;
  userData: string;
}

export class QuickView extends BaseAdaptiveCardView<
  IGitHubAceAdaptiveCardExtensionProps,
  IGitHubAceAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    return {
      subTitle: strings.SubTitle,
      title: strings.Title,
      userData: this.state.userData
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }
}