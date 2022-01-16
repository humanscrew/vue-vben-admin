import { Tooltip, Tag } from 'ant-design-vue';
import Icon from '/@/components/Icon';
import { handleCopy } from '/@/hooks/web/useCopyToClipboard';
import { isNullOrUnDef } from '/@/utils/is';

const Text = ({ text }) => (
  <>
    {text ? (
      <Tooltip title={text} placement="top" mouseEnterDelay={0.5}>
        <div onDblclick={() => handleCopy(text)}>{text}</div>
      </Tooltip>
    ) : (
      ''
    )}
  </>
);

const useTag = (ColorEnum) => {
  const tagColor = (text: string, ColorEnum) => {
    const color = ColorEnum[text];
    return color;
  };

  const _Tag = ({ text }) => (
    <>
      {text ? (
        <Tooltip title={text} placement="top" mouseEnterDelay={0.5}>
          <Tag onDblclick={() => handleCopy(text)} color={tagColor(text, ColorEnum)}>
            {text}
          </Tag>
        </Tooltip>
      ) : (
        ''
      )}
    </>
  );
  return _Tag;
};

const Lock = ({ text }) => (
  <>
    {!isNullOrUnDef(text) ? (
      <Icon
        icon={text ? 'mdi:lock-outline' : 'clarity:unknown-status-line'}
        color={text ? '' : 'red'}
      />
    ) : (
      ''
    )}
  </>
);

export const columnRender = {
  Text,
  useTag,
  Lock,
};
