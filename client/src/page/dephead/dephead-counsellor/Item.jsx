import clsx from 'clsx';
import {
  CircleMinus,
  CirclePlus,
  Layers,
  Mail,
  Phone,
  Tag,
} from 'lucide-react';
import { useContext, useMemo } from 'react';
import { toast } from 'sonner';
import MyButton from '../../../atom/my-button';
import { colors } from '../../../constance';
import ItemLayout from '../../../layout/item-layout';
import { deleteFieldsForCounSv } from '../../../service/dephead/depheadCounsellor.sv';
import { DataContext } from '../../../store';
import { getRoleName } from '../../../util/user.util';
import { DepheadCounsellorContext } from './DepheadCounsellorStore';

export const Item = ({ data }) => {
  const {
    selected,
    setSelected,
    depheadUpdateCounsellorStatus,
    setHiddenAddCounField,
    setCounsellors,
    counsellors,
  } = useContext(DepheadCounsellorContext);

  const { darkMode } = useContext(DataContext);

  const deleteFieldForCoun = async (fieldId) => {
    try {
      const response = await deleteFieldsForCounSv(data._id, fieldId);
      setCounsellors((prev) => {
        const tempField = data.fields.filter((field) => field._id !== fieldId);
        return prev.map((coun) => {
          if (coun._id === data._id) return { ...data, fields: tempField };
          else return coun;
        });
      });
      toast.success(response?.message || 'Xóa lĩnh vực thành công');
    } catch (error) {
      toast.success(error?.message || 'Lỗi khi xóa lĩnh vực cho tư vấn viên');
    }
  };

  const handleExpand = () => {
    const isExpanded = selected === data._id;
    if (isExpanded) setSelected(-1);
    else setSelected(data._id);
  };

  const cells = useMemo(() => {
    const iconProps = {
      color: darkMode ? '#fff' : colors.black75,
      size: 18,
    };
    const handleAddFieldClick = () => {
      setHiddenAddCounField(false);
    };

    return [
      {
        icon: <Phone {...iconProps} />,
        title: 'Số điện thoại:',
        content: data.phoneNumber || 'Chưa cập nhật',
      },
      {
        icon: <Mail {...iconProps} />,
        title: 'Email:',
        content: data.email || 'Chưa cập nhật',
      },
      {
        icon: <Tag {...iconProps} />,
        title: 'Chức vụ:',
        content: data.role ? getRoleName(data.role) : 'Chưa cập nhật',
      },
      {
        icon: <Layers {...iconProps} />,
        title: 'Lĩnh vực:',
        content: (
          <>
            <div
              className={clsx(
                'border rounded-lg overflow-hidden',
                darkMode ? 'border-white' : 'border-black25 '
              )}
            >
              <div className="max-h-32 overflow-auto px-8 py-1">
                {data?.fields?.length !== 0 ? (
                  data.fields.map((field) => {
                    return (
                      <p key={field._id} className="truncate">
                        {field.fieldName}
                        <button onClick={() => deleteFieldForCoun(field._id)}>
                          <CircleMinus
                            className="inline-block mx-1 bg-error rounded-full cursor-pointer"
                            size={20}
                            color="#fff"
                          />
                        </button>
                        ,
                      </p>
                    );
                  })
                ) : (
                  <p className="truncate">Chưa có lĩnh vực nào !!</p>
                )}
              </div>
            </div>
            <MyButton
              size={'sm'}
              className="bg-primary hover:bg-primary/75 mt-1"
              onClick={handleAddFieldClick}
            >
              <CirclePlus
                className="mx-1 rounded-full cursor-pointer"
                size={16}
                color="#fff"
              />
            </MyButton>
          </>
        ),
      },
    ];
  }, [data, setHiddenAddCounField, darkMode]);

  return (
    <ItemLayout
      image={data.avatar}
      text={data.fullName}
      isSelected={selected === data._id}
      status={data.isEnabled}
      onExpand={handleExpand}
      onStatus={() =>
        depheadUpdateCounsellorStatus(data._id, { isEnabled: !data.isEnabled })
      }
    >
      <div className="flex flex-col gap-2  pl-10 py-4  bg-primary/10 rounded-b-xl">
        {cells &&
          cells.map((cell, index) => (
            <Cell
              key={cell.title + index}
              icon={cell.icon}
              title={cell.title}
              content={cell.content}
            />
          ))}
      </div>
    </ItemLayout>
  );
};

const Cell = ({ icon, title, content }) => {
  const { darkMode } = useContext(DataContext);

  return (
    <div
      className={clsx(
        'flex flex-row gap-16',
        darkMode ? 'text-white' : 'text-black75'
      )}
    >
      <span className="flex flex-row items-center w-40 self-start">
        {icon}
        <p className="text-base ml-1 font-semibold">{title}</p>
      </span>
      <div className="text-base font-semibold">{content}</div>
    </div>
  );
};
