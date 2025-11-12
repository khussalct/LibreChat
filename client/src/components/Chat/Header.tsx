import { useMemo } from 'react';
import { useMediaQuery } from '@librechat/client';
import { useOutletContext } from 'react-router-dom';
import { getConfigDefaults, PermissionTypes, Permissions } from 'librechat-data-provider';
import type { ContextType } from '~/common';
import ModelSelector from './Menus/Endpoints/ModelSelector';
import { PresetsMenu, HeaderNewChat, OpenSidebar } from './Menus';
import { useGetStartupConfig } from '~/data-provider';
import ExportAndShareMenu from './ExportAndShareMenu';
import BookmarkMenu from './Menus/BookmarkMenu';
import { TemporaryChat } from './TemporaryChat';
import AddMultiConvo from './AddMultiConvo';
import { useHasAccess } from '~/hooks';

const defaultInterface = getConfigDefaults().interface;

export default function Header() {
  const { data: startupConfig } = useGetStartupConfig();
  const { navVisible, setNavVisible } = useOutletContext<ContextType>();

  const interfaceConfig = useMemo(
    () => startupConfig?.interface ?? defaultInterface,
    [startupConfig],
  );

  const hasAccessToBookmarks = useHasAccess({
    permissionType: PermissionTypes.BOOKMARKS,
    permission: Permissions.USE,
  });

  const hasAccessToMultiConvo = useHasAccess({
    permissionType: PermissionTypes.MULTI_CONVO,
    permission: Permissions.USE,
  });

  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  return (
    <div className="sticky top-0 z-10 h-14 w-full items-center justify-between bg-white p-2 font-semibold text-text-primary dark:bg-gray-800">
      <div className="hide-scrollbar w-full items-center justify-between gap-2 overflow-x-auto relative min-h-12">
        <div className={"mx-1 flex items-center gap-2" + (navVisible ? ' w-[calc(100%+100px)] absolute' : ' w-full')}>
          <div
            className={`flex items-center gap-2 ${
              !isSmallScreen ? 'transition-all duration-200 ease-in-out' : ''
            } ${
              !navVisible
                ? 'translate-x-0 opacity-100'
                : 'pointer-events-none translate-x-[-100px] opacity-0'
            }`}
          >
            <OpenSidebar setNavVisible={setNavVisible} className="max-md:hidden" />
            <HeaderNewChat />
          </div>
          <div
            className={`flex items-center gap-2 justify-between ${
              !isSmallScreen ? 'transition-all duration-200 ease-in-out' : ''
            } ${!navVisible ? 'translate-x-0 w-full' : ' w-[calc(100%+100px)] absolute'}`}
          >
            <img
              src="assets/solus-logo.jpg"
              alt="Solus"
              className="h-8 w-auto"
            />
            <ModelSelector startupConfig={startupConfig} />
          </div>
        </div>
      </div>
      {/* Empty div for spacing */}
      <div />
    </div>
  );
}
