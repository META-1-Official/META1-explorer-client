import api from '../store/apis';

const getBlockData = async (block_num) => {
    const block = await api.fetchBlock(block_num);
    return block?.data;
}

const blockService = { getBlockData };

export default blockService;
