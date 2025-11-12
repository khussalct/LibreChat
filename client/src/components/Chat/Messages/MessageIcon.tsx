import React, { useMemo, memo } from 'react';
import type { Assistant, Agent } from 'librechat-data-provider';
import type { TMessageIcon } from '~/common';
import { getEndpointField, getIconEndpoint, logger } from '~/utils';
import ConvoIconURL from '~/components/Endpoints/ConvoIconURL';
import { useGetEndpointsQuery } from '~/data-provider';
import Icon from '~/components/Endpoints/Icon';

const MessageIcon = memo(
  ({
    iconData,
    assistant,
    agent,
  }: {
    iconData?: TMessageIcon;
    assistant?: Assistant;
    agent?: Agent;
  }) => {
    logger.log('icon_data', iconData, assistant, agent);

    // Always show "VA" for assistant/agent messages
    if (iconData?.isCreatedByUser !== true) {
      return (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
          <span className="text-xs font-bold text-white">VA</span>
        </div>
      );
    }

    // For user messages, use the original Icon component
    const { data: endpointsConfig } = useGetEndpointsQuery();

    const iconURL = iconData?.iconURL;
    const endpoint = useMemo(
      () => getIconEndpoint({ endpointsConfig, iconURL, endpoint: iconData?.endpoint }),
      [endpointsConfig, iconURL, iconData?.endpoint],
    );

    const endpointIconURL = useMemo(
      () => getEndpointField(endpointsConfig, endpoint, 'iconURL'),
      [endpointsConfig, endpoint],
    );

    return (
      <Icon
        isCreatedByUser={iconData?.isCreatedByUser ?? false}
        endpoint={endpoint}
        iconURL={endpointIconURL}
        model={iconData?.model}
        assistantName=""
        agentName=""
        size={28.8}
      />
    );
  },
);

MessageIcon.displayName = 'MessageIcon';

export default MessageIcon;
