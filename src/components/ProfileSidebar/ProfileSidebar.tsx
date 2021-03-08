import React, { HTMLAttributes, useState } from 'react';
import { Select, AsyncSelect, Input, Textarea } from '../FinalFormAdapters';
import * as Styled from './ProfileSidebar.styles';
import UserImage from '@/components/UserImage';
import { utilsService } from '@/services/utilsService';

interface IProfileSidebar {
  children: JSX.Element | JSX.Element[] | string;
}

const ProfileSidebar = ({ children }: IProfileSidebar) => {
  return <Styled.Container>{children}</Styled.Container>;
};

const SectionTitle = ({
  children,
  ...props
}: { children: string } & HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <Styled.SectionTitleContainer>
      <Styled.SectionTitle {...props}>{children}</Styled.SectionTitle>
    </Styled.SectionTitleContainer>
  );
};

const AvatarInput = ({
  playerAvatar,
  ...props
}: React.ComponentProps<typeof Input> & {
  onUpload?: (url: string) => void;
  playerAvatar?: string | null;
}) => {
  const [imageName, setImageName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [
    changeEvent,
    setChangeEvent,
  ] = useState<React.ChangeEvent<HTMLInputElement> | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadPhoto = async () => {
    try {
      setIsLoading(true);
      const signedUrl = await utilsService.getSignedUrl({
        name: imageName,
        avatarFile,
      });

      props.onUpload && props.onUpload(signedUrl.signedUrl);

      props.input.onChange &&
        props.input.onChange({
          target: {
            value: signedUrl?.signedUrl.match(/(?:(?!\?).)*/)?.[0] || '',
          },
        });
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
      setIsImageUploaded(true);
    }
  };

  const cancelPhotoUploading = () => {
    setImageUrl('');
  };
  return (
    <div>
      <UserImage imageUrl={imageUrl || playerAvatar || null} />
      <div>
        {!imageUrl || isImageUploaded ? (
          <label htmlFor="userAvatar">Select Photo</label>
        ) : (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                uploadPhoto();
              }}
            >
              Upload Photo
            </button>
            <button
              onClick={() => {
                cancelPhotoUploading();
              }}
            >
              Cancel
            </button>
          </>
        )}
        <input
          type="image/png"
          id="userAvatar"
          accept="image/png"
          {...props}
          onChange={(event) => {
            const file = event.target.files?.[0] || null;

            if (!file) return;

            const image = URL.createObjectURL(file);

            setImageName(file.name);
            setImageUrl(image);

            setAvatarFile(file);
          }}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

const SelectInput = (props: React.ComponentProps<typeof Select>) => {
  return (
    <Select
      styles={{
        control: (provided, state) => ({
          ...provided,
          maxWidth: '100%',
          height: '40px',
          borderRadius: '4px',
          backgroundColor: '#eff1f3',
          borderWidth: '1px',
          borderStyle: 'solid',
          fontWeight: 'normal',
          color: '#667784',
          borderColor: 'transparent !important',
          lineHeight: '1.13',
          borderSpacing: '0',
          borderCollapse: 'separate',
          [':hover']: {
            boxShadow: state.isFocused ? 'none' : '0 1px 0 rgb(0 0 0 / 6%)',
            borderColor: '#48bbff',
          },
          ...(state.isFocused
            ? {
                backgroundColor: '#ffffff',
                borderColor: '#48bbff',
                boxShadow: 'none',
              }
            : {}),
        }),
        container: (provided, state) => ({
          ...provided,
          marginBottom: '15px',
        }),
        indicatorSeparator: (provided, state) => ({
          ...provided,
          display: 'none',
        }),
        menu: (provided, state) => ({
          ...provided,
          zIndex: 5,
        }),
        menuList: (provided, state) => ({
          ...provided,
          maxHeight: '200px',
          overflow: 'auto',
        }),
        dropdownIndicator: (provided, state) => ({
          ...provided,
          color: 'hsl(0, 0%, 50%) !important',
        }),
        singleValue: (provided, state) => ({
          ...provided,
          color: '#667784',
        }),
        multiValue: (provided, state) => ({
          ...provided,
          color: '#007eff',
        }),
        multiValueLabel: (provided, state) => ({
          ...provided,
          color: '#007eff',
        }),
        placeholder: (provided, state) => ({
          ...provided,
          color: '#667784',
        }),
        multiValueRemove: (provided, state) => ({
          ...provided,
          left: 0,
        }),
      }}
      {...props}
    />
  );
};

const AsyncSelectInput = (props: React.ComponentProps<typeof AsyncSelect>) => {
  return (
    <AsyncSelect
      styles={{
        control: (provided, state) => ({
          ...provided,
          maxWidth: '100%',
          height: '40px',
          borderRadius: '4px',
          backgroundColor: '#eff1f3',
          borderWidth: '1px',
          borderStyle: 'solid',
          fontWeight: 'normal',
          color: '#667784',
          borderColor: 'transparent !important',
          lineHeight: '1.13',
          borderSpacing: '0',
          borderCollapse: 'separate',
          [':hover']: {
            boxShadow: state.isFocused ? 'none' : '0 1px 0 rgb(0 0 0 / 6%)',
            borderColor: '#48bbff',
          },
          ...(state.isFocused
            ? {
                backgroundColor: '#ffffff',
                borderColor: '#48bbff',
                boxShadow: 'none',
              }
            : {}),
        }),
        container: (provided, state) => ({
          ...provided,
          marginBottom: '15px',
        }),
        indicatorSeparator: (provided, state) => ({
          ...provided,
          display: 'none',
        }),
        menu: (provided, state) => ({
          ...provided,
          zIndex: 5,
        }),
        menuList: (provided, state) => ({
          ...provided,
          maxHeight: '200px',
          overflow: 'auto',
        }),
        dropdownIndicator: (provided, state) => ({
          ...provided,
          color: 'hsl(0, 0%, 50%) !important',
        }),
        singleValue: (provided, state) => ({
          ...provided,
          color: '#667784',
        }),
        multiValue: (provided, state) => ({
          ...provided,
          color: '#007eff',
        }),
        multiValueLabel: (provided, state) => ({
          ...provided,
          color: '#007eff',
        }),
        placeholder: (provided, state) => ({
          ...provided,
          color: '#667784',
        }),
        multiValueRemove: (provided, state) => ({
          ...provided,
          left: 0,
        }),
      }}
      {...props}
    />
  );
};

const TextInput = (props: React.ComponentProps<typeof Input>) => {
  return <Styled.TextInput {...props} />;
};

const TextareaInput = (props: React.ComponentProps<typeof Textarea>) => {
  return <Styled.TextareaInput {...props} />;
};

ProfileSidebar.Container = Styled.Container;
ProfileSidebar.DataItem = Styled.DataItem;
ProfileSidebar.SectionTitle = SectionTitle;
ProfileSidebar.Heading = Styled.Heading;
ProfileSidebar.Value = Styled.Value;
ProfileSidebar.InlineInputsWrapper = Styled.InlineInputsWrapper;
ProfileSidebar.Input = TextInput;
ProfileSidebar.Select = SelectInput;
ProfileSidebar.AsyncSelect = AsyncSelectInput;
ProfileSidebar.Textarea = TextareaInput;
ProfileSidebar.AvatarInput = AvatarInput;

export default ProfileSidebar;
