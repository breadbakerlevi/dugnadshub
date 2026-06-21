import { filterModalStyles as styles } from "@/styles/filtermodal.styles";
import { FilterState, categories, statusFilters } from "@/utils/filter";
import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, Text, View } from "react-native";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
}

export default function FilterModal({
  visible,
  onClose,
  filters,
  onFiltersChange,
  onApplyFilters,
  onResetFilters,
}: FilterModalProps) {
  const handleToggleCategory = (category: string) => {
    const newCategories = filters.selectedCategories.includes(category)
      ? filters.selectedCategories.filter((c) => c !== category)
      : [...filters.selectedCategories, category];

    onFiltersChange({ ...filters, selectedCategories: newCategories });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <Pressable style={styles.filterModalBackdrop} onPress={onClose}>
        <Pressable style={styles.filterModalContent}>
          <Text style={styles.filterModalTitle}>Filtrer dugnader</Text>

          {/* Kategorier */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Kategori</Text>
            <View style={styles.categoriesContainer}>
              {categories.map((category) => (
                <Pressable
                  key={category}
                  style={[
                    styles.categoryChip,
                    filters.selectedCategories.includes(category) &&
                      styles.categoryChipSelected,
                  ]}
                  onPress={() => handleToggleCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      filters.selectedCategories.includes(category) &&
                        styles.categoryChipTextSelected,
                    ]}
                  >
                    {category}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Status filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Status</Text>
            <View style={styles.statusFiltersContainer}>
              {statusFilters.map((filter) => (
                <Pressable
                  key={filter.value}
                  style={[
                    styles.statusFilterChip,
                    filters.statusFilter === filter.value &&
                      styles.statusFilterChipSelected,
                  ]}
                  onPress={() =>
                    onFiltersChange({ ...filters, statusFilter: filter.value })
                  }
                >
                  <Text
                    style={[
                      styles.statusFilterChipText,
                      filters.statusFilter === filter.value &&
                        styles.statusFilterChipTextSelected,
                    ]}
                  >
                    {filter.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Mine dugnader */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Vis</Text>
            <Pressable
              style={styles.checkboxRow}
              onPress={() =>
                onFiltersChange({
                  ...filters,
                  showMyPosts: !filters.showMyPosts,
                })
              }
            >
              <View
                style={[
                  styles.checkbox,
                  filters.showMyPosts && styles.checkboxSelected,
                ]}
              >
                {filters.showMyPosts && (
                  <Ionicons name="checkmark" size={16} color="white" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>Kun mine dugnader</Text>
            </Pressable>

            <Pressable
              style={styles.checkboxRow}
              onPress={() =>
                onFiltersChange({
                  ...filters,
                  showJoinedPosts: !filters.showJoinedPosts,
                })
              }
            >
              <View
                style={[
                  styles.checkbox,
                  filters.showJoinedPosts && styles.checkboxSelected,
                ]}
              >
                {filters.showJoinedPosts && (
                  <Ionicons name="checkmark" size={16} color="white" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>
                Dugnader jeg har meldt meg på
              </Text>
            </Pressable>
          </View>

          {/* Filter knapper */}
          <View style={styles.filterButtonsContainer}>
            <Pressable
              style={styles.filterButtonSecondary}
              onPress={onResetFilters}
            >
              <Text style={styles.filterButtonSecondaryText}>Nullstill</Text>
            </Pressable>
            <Pressable
              style={styles.filterButtonPrimary}
              onPress={onApplyFilters}
            >
              <Text style={styles.filterButtonPrimaryText}>Bruk filtre</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
