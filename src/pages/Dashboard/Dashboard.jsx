import AttachmentIcon from '@mui/icons-material/Attachment';

import {AppPagination} from '../../components/AppPagination';
import {Chip} from '../../components/Chip';
import {Link} from '../../components/Link';
import {SearchBox} from '../../components/SearchBox';
import {Icon} from '../../components/Icon';

export default function Dashboard() {
  return (
    <div className="page">
      Dashboard
      <AppPagination />
      <SearchBox placeholder="Search for Amount" />
      <Chip label="Limit Order Create" fillColor="#4c8fe4" />
      <Link href="https://google.com" text="meta1" />
      <Icon icon={<AttachmentIcon sx={{color: '#8d3f01'}} />} />
    </div>
  );
}
